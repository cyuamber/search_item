import { call, put, take, fork, cancel, race } from 'redux-saga/effects'
import { beginPolling } from './utils'
const Dirty = {}

const downUrl = {
  'DEFAULT': '/logistics/getexporttask',
  'NEW': '/logistics/getexporttasknew',
  'DATA': '/wldata/getexporttask',
}
Dirty.download = function* (type, downloadType = 'DEFAULT') {
  yield put({
    type: 'CHANGE_DOWNLOAD_LIST_VISIBILITY',
    show: true
  })
  yield fork(beginPolling, {
    detailAction: {
      type: 'REQUEST_GETJSON_DOWNLOAD_POLLING',
      payload: {
        url: downUrl[downloadType]
      }
    },
    mockInterval: 10,
    id: type
  })
}

Dirty.getFetchParams = (payload) => ({
  url: payload.url,
  params: payload.download ? { ...payload.params, display: 'export' } : payload.params
})

export default Dirty
