import React, { Component } from 'react';
import { Tabs } from 'antd';

import Weather from './modules/Container/Weather'
import Books from './modules/Container/Books'
import Movies from './modules/Container/Movies'
import Express from './modules/Container/Express'
import Chatroom from './modules/Container/Chatroom'

import './App.css';
const TabPane = Tabs.TabPane;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="app_header">
          <p>来查点什么吧</p>
        </header>
        <Tabs
          style={{ marginTop: 50 }}
          defaultActiveKey="1"
          tabPosition={'left'}
        >
          <TabPane tab="天气" key="1">{<Weather />}</TabPane>
          <TabPane tab="快递" key="2">{<Express />}</TabPane>
          <TabPane tab="书籍" key="3">{<Books />}</TabPane>
          <TabPane tab="电影" key="4">{<Movies />}</TabPane>
          <TabPane tab="小徐陪聊" key="5">{<Chatroom />}</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
