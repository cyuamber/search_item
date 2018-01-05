import { put, take, fork, cancel, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

// 只监听actionType带有REQUEST的
export const SAGA_ACTION_PREFIX = 'REQUEST_'
export const LOADING_ACTION_PREFIX = 'LOADING_'
export const FETCH_SUCCESS_PREFIX = 'SUCCESS_RCV_'
export const FETCH_ERROR_PREFIX = 'ERROR_RCV_'
export const FETCH_TIMEOUT_PREFIX = 'ERROR_TIMEOUT_'
export const POLLING_START_PREFIX = 'POLLING_START_'
export const POLLING_END_PREFIX = 'POLLING_END_'

export const FETCH_TYPE = {
  GET: 'GET',
  GETHTML: 'GETHTML',
  GETJSON: 'GETJSON',
  POST: 'POST',
  POSTFORM: 'POSTFORM',
  POSTJSON: 'POSTJSON',
  POSTFILE: 'POSTFILE'
}
// 前端报错，errno都大于0
export const FRONTEND_ERROR = {
  NO_REQUEST: {
    errno: '1',
    errmsg: '',
    remark: 'No request occurred'
  }
}

export const generateSagaAction = (fetchType = FETCH_TYPE.GETJSON, name) => {
  return `${SAGA_ACTION_PREFIX}${fetchType}_${name}`
}

export const getSagaActionName = (actionType) => {
  return actionType && actionType.split('_').slice(2).join('_')
}

export const getSagaActionType = (actionType) => {
  return actionType && actionType.split('_')[1]
}

// 轮询器
function* pollingSaga(fetchAction) {
  const { defaultInterval, mockInterval } = fetchAction

  while (true) {
    try {
      const result = yield put(fetchAction.detailAction)
      const interval = mockInterval || result.interval

      yield call(delay, interval * 1000)
    } catch (e) {
      yield call(delay, defaultInterval * 1000)
    }
  }
}

export function* beginPolling(pollingAction) {
  const { defaultInterval = 5, mockInterval, detailAction, id } = pollingAction

  if (!detailAction.type) {
    console.error('pollingAction pattern error', pollingAction)
    throw Error('pollingAction type is null')
  }

  const fetchAction = {
    detailAction,
    mockInterval,
    defaultInterval
  }

  const pollingTaskId = yield fork(pollingSaga, fetchAction)
  const pattern = action => action.type === `${POLLING_END_PREFIX}${id}` || action.stopPolling
  // 轮询不具备自己的id，这是很无奈、很悲惨的事情，所以如果使用stopPolling，即只允许一个轮询器存在
  yield take(pattern)
  yield cancel(pollingTaskId)
}

export const SEQ = {
  main: (dispatch, action) => {
    SEQ.dispatch = dispatch;
    SEQ.action = action;
    return SEQ;
  },
  success: (action) => {
    if (SEQ.action) {
      SEQ.action.payload.success = action;
    }
    return SEQ;
  },
  failure: (action) => {
    if (SEQ.action) {
      SEQ.action.payload.failure = action;
    }
    return SEQ;
  },
  download: () => {
    if (SEQ.action) {
      SEQ.action.payload.download = true;
    }
    return SEQ;
  },
  start: () => {
    if (SEQ.dispatch && SEQ.action) {
      SEQ.dispatch(SEQ.action);
      SEQ.action = null;
      SEQ.dispatch = null;
    }
  }
}