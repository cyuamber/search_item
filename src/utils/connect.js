import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
/**
 * connect生成器
 *
 * @param  {[func]} 	   mapStateToProps 	 [任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用，传入新的state。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并]
 * @param  {[func or obj]} actions   [如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象
 * const mapDispatchToProps = (dispatch, ownProps) => {
	 return {
		 dispatch1: () => {
			 dispatch(actionCreator)
		 }
	 }
 }
 * ]
 * @return {[func]}        [redux connect实例]
 */
// 目的是把actions用dispatch包装了一下，以便直接调用
function objectMapCreators(actions, dispatch) {
  let _actionsCreators = {};
  Object.keys(actions).forEach(item => {
    let _actions = {};
    Object.keys(actions[item]).forEach(actionName => {
      if (typeof actions[item][actionName] === 'function') {
        _actions[actionName] = actions[item][actionName]
      }
    })
    _actionsCreators[item] = bindActionCreators(_actions, dispatch);
  });
  return _actionsCreators;
}
export default function connectFactory(mapStateToProps, actions) {
  return connect(
		mapStateToProps,
    typeof actions === 'function' ? actions : dispatch => {
      return objectMapCreators(actions, dispatch);
    }
	);
}
