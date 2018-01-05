import React, { Component } from 'react';
import { Button, Form, Input, Select } from 'antd';

import './style.css';

const FormItem = Form.Item;
const Option = Select.Option;

class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                <Form layout="inline" style={{ width: '200px', display: 'flex' }} >
                    <FormItem>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="请选择城市"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >

                        </Select>
                    </FormItem>
                    <Button type='primary'>Go</Button>
                </Form>

            </div>
        );
    }
}

export default Toolbar;
