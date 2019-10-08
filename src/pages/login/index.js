/* eslint-disable */

import React from 'react'
import { Table, Divider, Tag, Pagination, Modal, Button, Form, Spin, Input, Icon } from 'antd'
import { connect } from 'dva'
import router from 'umi/router';
import { Chart, Geom, Axis, Tooltip } from "bizcharts";



const data = [];

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, dispatch } = this.props
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            dispatch({
                type: 'login/login',
                payload: values
            })
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.props;
        return (
            <div style={{width: '30%', marginLeft: '35%', marginTop: '10%'}}>
                <Spin spinning={loading == undefined ? false : loading}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            <div style={{marginLeft: '40%', fontSize: 30}}>用户登录</div>
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入8~12个英文字母或数字', min: 8, max: 12 },
                                { pattern: /^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)+$/, message: '名称只能输入英文，数字.' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入8~20个英文字母或数字', min: 8, max: 20 },
                                { pattern: /^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)+$/, message: '名称只能输入英文，数字.' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { } = state.login
    return {
        loading: state.loading.models.login,
    }
}

export default Form.create()(connect(mapStateToProps)(Index));

