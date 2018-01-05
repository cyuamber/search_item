import S from '../service';
export const GET_WEATHER_LIST = 'GET_WEATHER_LIST';

//请求数据，搜索数据时使用
export const getWeatherData = (filters) => {
    return (dispatch, getState) => {
        dispatch(S.get_weather(filters)).then(ret => {
            if (ret.status) {
                let data = ret.weather[0];
                dispatch(getWeatherList(data, filters));
            }
        })
    }
};

//展示表格数据
export const getWeatherList = (data, filters) => {
    return { type: GET_WEATHER_LIST, data, filters }
};
