import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import connect from '../../../../utils/connect';
import * as actions from '../../../States/actions/Weather';
import { Tabs } from 'antd';
import { weatherdata } from './constant'

import Toolbar from './Toolbar/Toolbar'
import Container from './Container'

import './style.css';


export default class Weather extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //const { Weather: { data }, actions } = this.props;
        return (
            <div className="Weather">
                <Toolbar
                    actions={actions}
                />
                <Container
                    data={weatherdata.weather}
                />
            </div>
        );
    }
}
