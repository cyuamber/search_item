import { LOADING_START, LOADING_END, SUCCESS_RCV, ERROR_RCV } from '../common/xhr'

export default function xhr({ dispatch }) {

    return (next) => (action) => {

        const { type } = action;

        //ajax请求前
        if(type.match(/FETCH_/)){
        	dispatch({
        		type: LOADING_START
        	})

        //ajax请求后成功集中回调
        }else if(type.match(/SUCCESS_RCV_/)){

            dispatch({
                type: LOADING_END
            })

            if(action.payload.errno != 0){
                return dispatch({
                    type: ERROR_RCV,
                    payload: action.payload
                })
            }else{
                dispatch({
                    type: SUCCESS_RCV,
                    payload: action.payload
                })
            }

        //ajax请求失败后集中回调
        }else if(type.match(/ERROR_RCV_/)){

            dispatch({
        		type: LOADING_END
        	})

            dispatch({
                type: ERROR_RCV,
                url: type
            })

        }

        return next(action)
    }

}
