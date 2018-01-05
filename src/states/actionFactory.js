import { createResourceAction } from 'redux-resource-wlfe'

export const FETCH_ARR = ["FETCH_", "SUCCESS_RCV_", "ERROR_RCV_"]
export const EXEC_NORMAL_ARR = ["FETCH_EXEC_NORMAL_", "SUCCESS_RCV_EXEC_NORMAL_", "ERROR_RCV_EXEC_NORMAL_"]

const ActionFactory = {

	/**
	* 获取普通操作型action
	*/
	getExecNormal: (resource, name) => {
		return createResourceAction.apply( null, [resource].concat( EXEC_NORMAL_ARR.map(item => {
			return item + name
		}) ) )
	},

	/**
	* 获取拉取数据型action
	*/
	getFetch: (resource, name) => {
		return createResourceAction.apply( null, [resource].concat( FETCH_ARR.map(item => {
			return item + name
		}) ) )
	},

	/**
	 * Post发送表单数据
	 * */
	postForm: (resource, name) => {
		resource.method = 'POST';
		resource.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
		return createResourceAction.apply( null, [resource].concat( FETCH_ARR.map(item => {
			return item + name
		}) ) )
	},

	/**
	 * Post发送Json数据
	 * */
	postData: (resource, name) => {
		resource.method = 'POST';
		resource.headers = {
            'Content-Type': 'application/json'
        }
		return createResourceAction.apply( null, [resource].concat( FETCH_ARR.map(item => {
			return item + name
		}) ) )
	},

	/**
	 * Post发送表单数据，Content-Type:multipart/form-data
	 * */
	postExecNormal: (resource, name) => {
		resource.method = 'POST';
		resource.headers = {
            'Content-Type': 'multipart/form-data'
        }
		return createResourceAction.apply( null, [resource].concat( FETCH_ARR.map(item => {
			return item + name
		}) ) )
	},
}

export default ActionFactory
