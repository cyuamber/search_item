import React from 'react';
import { GET_WEATHER_LIST } from '../actions/Weather';

let initialState = {
    weather: []
};

export default function reducer(state = initialState, action) {
    let weather = { ...state.weather };
    switch (action.type) {
        case GET_WEATHER_LIST:
            weather = {
                ...weather,
                data: action.data,
                filters: action.filters
            };
            return {
                ...state,
                weather
            }
        default:
            return state;
    }
}