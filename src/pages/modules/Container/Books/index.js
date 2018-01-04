import React, { Component } from 'react';
import { Tabs } from 'antd';

import Toolbar from './Toolbar/Toolbar'

import './style.css';
const TabPane = Tabs.TabPane;

class Books extends Component {
    render() {
        return (
            <div className="Books">
                <Toolbar />
            </div>
        );
    }
}

export default Books;
