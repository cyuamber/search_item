/* global Loading 页面之间引入*/

/**
 * loading动画公共state
 */
export const LOADING_START = 'LOADING_START'
export const LOADING_END   = 'LOADING_END'
export const SUCCESS_RCV   = 'SUCCESS_RCV'
export const ERROR_RCV     = 'ERROR_RCV'

const initState = false

export default function reducer(state = initState, action) {

  switch (action.type) {

    case LOADING_START:
        window.Loading.show()
        return state

    case LOADING_END:
        window.Loading.hide()
        return state

    case SUCCESS_RCV:
        if(action.payload.errno){
            toastr.error(action.payload.errmsg)
        }
        return state

    case ERROR_RCV:
        if(action.payload){
            if (action.payload.errmsg) {
                toastr.error("请求错误，错误原因："+action.payload.errmsg)
            } else {
                toastr.error('系统错误');
            }
        }else{
            toastr.error('系统错误');
            console.log("请求失败，失败action："+action.url)
        }
        return state

    default:
        return state
  }

}
