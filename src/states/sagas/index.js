import { call, put, take, fork, cancel, race } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import FE from 'states/fetch'
import { download, getFetchParams } from './dirty'
import _ from 'lodash'

import {
  SAGA_ACTION_PREFIX,
  FRONTEND_ERROR,
  LOADING_ACTION_PREFIX,
  FETCH_SUCCESS_PREFIX,
  FETCH_ERROR_PREFIX,
  FETCH_TIMEOUT_PREFIX,
  FETCH_TYPE,
  getSagaActionName,
  getSagaActionType
} from './utils'

function* fetchSaga(fetch, taskArray, action, operateType) {
  const name = getSagaActionName(action.type)

  if (!action.payload.cache || !taskArray[action.type] || !_.isEqual(taskArray[action.type].action, action)) {
    try {
      let result = false
      let task = {}

      if (action.payload.race) {
        action.payload.race.forEach(
          item => {
            if (item.delay) {
              task.delay = call(delay, item.delay * 1000)
            } else {
              task[item.url] = call(fetch, getFetchParams(item))
            }
          }
        )
        result = yield race(task)
        result = !result.delay && _.values(result)[0]
      } else if (action.payload.con) {
        result = yield action.payload.con.map(
          item => call(fetch, getFetchParams(item))
        )
      } else if (action.payload.serial) {// 串行发请求
        result = [];
        const serial = action.payload.serial;
        for (let i = 0; i < serial.length; i++) {
          if (i === 0 || result[i - 1].errno === 0) {
            result[i] = yield call(fetch, getFetchParams(serial[i]));
            result[i] = yield result[i].json();
          } else {
            result[i] = FRONTEND_ERROR.NO_REQUEST;
          }
        }
      } else {
        result = yield call(fetch, getFetchParams(action.payload))
      }

      if (result) {
        const data = _.isArray(result) ? _.isArray(action.payload.serial) ? result : yield result.map(item => item.json()) : yield result.json()
        // 此处暂不处理result是其他类型的情况，反正写的FE相当粗糙
        if (_.isArray(data) && _.every(data, item => item.errno === 0) || data.errno === 0) {
          // 默认POST类操作，在成功时toastr操作成功；
          if (operateType && operateType.indexOf('POST') > -1) {
            _.isArray(data) ? data.forEach(i => i.errmsg ? toastr.success(i.errmsg) : toastr.success('操作成功')) : data.errmsg ? toastr.success(data.errmsg) : toastr.success('操作成功')
          }
          // 成功的action，params也给出去
          let payload = { data, filters: {} }
          if (!_.isArray(data)) {
            payload.data = data.data;
            payload.filters = action.payload.params;
          } else if (action.payload.con) {
            payload.filters = action.payload.con.map(i => i.params);
          } else if (action.payload.serial) {
            payload.filters = action.payload.serial.map(i => i.params);
          }
          yield put({
            type: `${FETCH_SUCCESS_PREFIX}${name}`,
            payload,
          })
          // 如果是download，就展开轮询
          if (action.payload.download) {
            // 无论是并发还是竞争，他们运行一次
            yield call(download, name, action.payload.downloadType)
          }
          // 对success的处理有些潦草了
          if (action.payload.success) {
            let success = action.payload.success;
            if (_.isFunction(success)) {
              success = success(data);
            }
            yield put(success)
          }
        } else {
          yield put({ type: `${FETCH_ERROR_PREFIX}${name}`, payload: data })
          _.isArray(data) ? data.forEach(i => i.errmsg ? toastr.error(i.errmsg) : toastr.error('系统错误')) : data.errmsg ? toastr.error(data.errmsg) : toastr.error('系统错误')
          // 这是后端给出的失败
          if (action.payload.failure) {
            yield put(action.payload.failure)
          }
        }
      } else {
        yield put({ type: `${FETCH_TIMEOUT_PREFIX}${name}` });
        // 请求超时，同样无法阻止该次请求被发出去
      }

    } catch (error) {
      yield put({ type: `${FETCH_ERROR_PREFIX}${name}`, payload: error });
      toastr.error('系统错误')
      // 这是捕获到异常了
      console.log('error')
      if (action.payload.failure) {
        yield put(action.payload.failure)
      }
    }
  } else {
    yield put({ type: `${FETCH_SUCCESS_PREFIX}${name}` });
    // 缓存模式，reducer里面去判断payload是否为undefined
    if (action.payload.success) {
      yield put(action.payload.success)
    }
  }

  yield put({ type: `${LOADING_ACTION_PREFIX}${name}`, payload: false })

  // 该次fetch的loading结束
  if (_.isEmpty(_.compact(_.map(taskArray, (i, k) => k.split('_').slice(2).join('_') !== name && i.task.isRunning())))) {
    yield put({ type: 'LOADING', payload: false })
    window.Loading.hide()
  }
  // 如果任务列表空了，那么全部loading结束
}

function* watchSaga() {
  // 当前任务加进列表
  let taskArray = {};

  // 监听开始，必须保证每次fetch发起后都要走到这里来
  while (true) {
    // 只监听actionType带有REQUEST的
    const action = yield take(
      action => !_.isEmpty(action.type.match(SAGA_ACTION_PREFIX))
    );
    // fetch类型
    const type = getSagaActionType(action.type);
    // fetch名称
    const name = getSagaActionName(action.type);

    if (!type || !name || !action.payload) {
      continue;
    }

    // 如果任务列表空了，那么此次fetch会带来大的loading，用于小黄条
    if (_.isEmpty(_.compact(_.map(taskArray, i => i.task.isRunning())))) {
      yield put({ type: 'LOADING', payload: true });
      window.Loading.show()
    }

    // 此次fetch的小loading，如果相同的fetchTask没有结束，那么不再重复发起该action
    if (taskArray[action.type] && !taskArray[action.type].task.isRunning() || !taskArray[action.type]) {
      yield put({ type: `${LOADING_ACTION_PREFIX}${name}`, payload: true });
    }

    // 无条件cancel同样的task，重新开始，解决请求竞争问题，但是无法阻止请求被发出去（废话）
    yield taskArray[action.type] && cancel(taskArray[action.type].task);

    let task;
    switch (type) {
      case FETCH_TYPE.GET:
      case FETCH_TYPE.GETHTML:
      case FETCH_TYPE.GETJSON:
        // 无阻塞调用fetchSaga，这里的fork相当重要
        task = yield fork(fetchSaga, FE.getJSON, taskArray, action);
        break;
      case FETCH_TYPE.POST:
        task = yield fork(fetchSaga, FE.post, taskArray, action, type);
        break;
      case FETCH_TYPE.POSTFORM:
        task = yield fork(fetchSaga, FE.postForm, taskArray, action, type);
        break;
      case FETCH_TYPE.POSTJSON:
        task = yield fork(fetchSaga, FE.postJSON, taskArray, action, type);
        break;
      case FETCH_TYPE.POSTFILE:
        task = yield fork(fetchSaga, FE.postFile, taskArray, action, type);
        break;
      default:
        break;
    }
    // 当前任务加进列表
    taskArray[action.type] = { task, action };
  }
}

const rootSaga = (otherSaga) => function* () {
  // 给出接入其他的saga的接口
  yield otherSaga ? [call(watchSaga), call(otherSaga)] : call(watchSaga);
};
export default rootSaga;
