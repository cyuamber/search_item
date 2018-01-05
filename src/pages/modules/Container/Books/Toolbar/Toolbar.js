import React, { Component } from 'react';
import { Button, Form, Input, Select } from 'antd';

import './style.css';

const FormItem = Form.Item;
const Option = Select.Option;

class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                <Form style={{ width: '200px' }} >
                    <FormItem label="书名" layout="inline">
                        <Input />
                    </FormItem>
                    <Button type='primary'>Go</Button>
                </Form>

            </div>
        );
    }
}

export default Toolbar;
