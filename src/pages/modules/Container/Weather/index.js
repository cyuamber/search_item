import React, { Component } from 'react';
import { Tabs } from 'antd';

import Toolbar from './Toolbar/Toolbar'

import './style.css';
const TabPane = Tabs.TabPane;

class Weather extends Component {
    render() {
        return (
            <div className="Weather">
                <Toolbar />
            </div>
        );
    }
}

export default Weather;
