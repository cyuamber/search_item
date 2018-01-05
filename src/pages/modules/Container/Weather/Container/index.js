import React, { Component } from 'react';
import { Button, Form, Input, Select, List, Icon, Avatar } from 'antd';

import './style.css';

const FormItem = Form.Item;
const Option = Select.Option;

const listData = [];
for (let i = 0; i < 5; i++) {
    listData.push({
        title: ` ${i + 1}日后天气`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '今日天气',
    });
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props, 'this.props')
        const { data } = this.props;
        const now = data[0].now;
        console.log(data[0].now)
        return (
            <div className="Container">
                <h3>今日{data[0].city_name}天气</h3>
                <div>
                    <p>天气：{now.text}</p>
                    <p>气温：{now.temperature}</p>
                    <p>风速：{now.wind_speed}</p>
                    <p>风向：{now.wind_direction}</p>
                    <p>风级：{now.wind_scale}</p>
                    <p>能见度：{now.visibility}</p>
                    <p>湿度：{now.humidity}</p>
                    <p>气压：{now.pressure}</p>
                    <p>PM2.5：{now.air_quality.city.pm25}</p>
                    <p>空气质量：{now.air_quality.city.quality}</p>
                </div>

                <hr />
                <h3>未来一周</h3>
                <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={item.title}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Container;
