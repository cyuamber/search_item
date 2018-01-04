import React, { Component } from 'react';
import { Button, Form, Input, Select } from 'antd';

import './style.css';

const FormItem = Form.Item;
const Option = Select.Option;

class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                <Form style={{ width: '200px', display: 'flex' }} layout="inline">
                    <FormItem>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="想查什么？"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="weather">天气</Option>
                            <Option value="express">快递</Option>
                            <Option value="books">书籍</Option>
                            <Option value="movies">电影</Option>
                            <Option value="chatroom">小徐陪聊</Option>
                        </Select>
                    </FormItem>
                    <Button type='primary'>Go</Button>
                </Form>

            </div>
        );
    }
}

export default Toolbar;
