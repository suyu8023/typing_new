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
                    type: 'admin_uid/updateUser',
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
        const { email, nickname, status, ID, username } = this.props;
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="ID">
                    {getFieldDecorator('uid', {
                        initialValue: ID
                    })(<Input disabled={true} />)}
                </Form.Item>
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: '请输入1~11个字符', min: 1, max: 11 },
                        ],
                        initialValue: username
                    })(<Input disabled={true}/>)}
                </Form.Item>
                <Form.Item label="昵称">
                    {getFieldDecorator('nickname', {
                        rules: [
                            { required: true, message: '请输入1~11个字符', min: 1, max: 11 },
                        ],
                        initialValue: nickname
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="邮箱">
                    {getFieldDecorator('email', {
                        initialValue: email,
                        rules: [
                            { required: true, message: '请输入邮箱' }
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="等级">
                    {getFieldDecorator('status', {
                        initialValue:  status ,
                        rules: [
                            { required: true, message: '请选择等级' }
                        ],
                    })(<Select style={{ width: '100%' }}>
                        <Option value={1}>管理员</Option>
                        <Option value={2}>普通用户</Option>
                    </Select>)}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                    })(<Input />)}
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
    const { email, nickname, status, ID, username } = state.admin_uid
    return {
        loading: state.loading.models.admin_uid,
        email, 
        nickname, 
        status, 
        ID, 
        username
    }
}

export default Form.create()(connect(mapStateToProps)(Index))