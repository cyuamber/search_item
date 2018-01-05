/**
 * 左侧tab切换公共state
 */

export const CHANGE_LEFT_TAB = 'CHANGE_LEFT_TAB'
export const CHANGE_TOP_TAB = 'CHANGE_TOP_TAB'

//左侧点击action
export const changeLeftTab = (index) => {
	return {
		type: CHANGE_LEFT_TAB,
		index
	}
}

export const changeTopTab = (index) => {
  return { type: CHANGE_TOP_TAB, index }
}

//当前选中左侧tab
let nowLeft = null

export default function reducer(tabinfo) {

  return (state = tabinfo, action) => {
    switch (action.type) {

      //改变头部tab
      case CHANGE_TOP_TAB:
        const _state = [].concat(state)

        _state[nowLeft].children = _state[nowLeft].children.map((item, index) => {
          item.active = (index === action.index)
          return item
        })

        return _state

      //改变左侧tab
      case CHANGE_LEFT_TAB:
        return state.map((item, index) => {

          if(index === action.index){
            item.active = true
            nowLeft = index
          }else{
            item.active = false
          }

          return item
        })

      //设置当前选中左侧tab
      default:
        state.map((item, index) => {
          if(item.active) nowLeft = index
        })
        return state
    }
  }
  
}
