import React, { Component } from 'react';
import { Tabs } from 'antd';

import Toolbar from './Toolbar/Toolbar'

import './style.css';
const TabPane = Tabs.TabPane;

class Chatroom extends Component {
    render() {
        return (
            <div className="Chatroom">
                <Toolbar />
            </div>
        );
    }
}

export default Chatroom;
