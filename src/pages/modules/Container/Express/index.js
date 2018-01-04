import React, { Component } from 'react';
import { Tabs } from 'antd';

import Toolbar from './Toolbar/Toolbar'

import './style.css';
const TabPane = Tabs.TabPane;

class Express extends Component {
    render() {
        return (
            <div className="Express">
                <Toolbar />
            </div>
        );
    }
}

export default Express;
