import React, { Component } from 'react';
import { Tabs } from 'antd';

import Toolbar from './Toolbar/Toolbar'

import './style.css';
const TabPane = Tabs.TabPane;

class Movies extends Component {
    render() {
        return (
            <div className="Movies">
                <Toolbar />
            </div>
        );
    }
}

export default Movies;
