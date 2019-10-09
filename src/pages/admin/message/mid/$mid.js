import React from 'react'
import { Form, Input, Button, Select } from 'antd';
import { connect } from 'dva'
const { Option } = Select;
const { TextArea } = Input;
class Index extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        const { dispatch } = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'admin_mid/updateMessage', 
                    payload: values
                })
                // console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 18 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const { Message, diff, name, ID } = this.props;
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="ID">
                    {getFieldDecorator('mid', {
                        initialValue: ID
                    })(<Input disabled={true} />)}
                </Form.Item>
                <Form.Item label="标题">
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '请输入1~11个字符', min: 1, max: 11 },
                        ],
                        initialValue: name
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="等级">
                    {getFieldDecorator('diff', {
                        initialValue: diff,
                        rules: [
                            { required: true, message: '请选择等级' }
                        ],
                    })(<Select style={{ width: '100%' }}>
                        <Option value="简单">简单</Option>
                        <Option value="中等">中等</Option>
                        <Option value="困难">困难</Option>
                    </Select>)}
                </Form.Item>
                <Form.Item label="文章内容">
                    {getFieldDecorator('message', {
                        initialValue: Message,
                        rules: [
                            { required: true, message: '请输入文章内容' }
                        ],
                    })(<TextArea rows={4} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        更新
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    const { Message, diff, name, ID } = state.admin_mid
    return {
        loading: state.loading.models.admin_mid,
        Message,
        diff,
        name,
        ID
    }
}

export default Form.create()(connect(mapStateToProps)(Index))