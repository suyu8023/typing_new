/* eslint-disable */

import React from 'react';
import {
  Table,
  Divider,
  Tag,
  Pagination,
  Modal,
  Button,
  Form,
  Spin,
  Input,
  Icon,
  message,
} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

const { Search } = Input;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      time: 60,
      btnDisable: false,
      btnContent: '发送验证码',
      send: false,
      email: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch, Code } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (
        values.code !== Code ||
        Code == undefined ||
        !this.state.send ||
        this.state.email != values.email
      ) {
        message.error('验证码输入错误');
        return;
      }
      if (values.password === values.password1) {
        dispatch({
          type: 'reg/reg',
          payload: values,
        });
      } else {
        message.error('两次密码输入不一样');
      }
    });
  };

  send = e => {
    const { form, dispatch } = this.props;
    form.validateFields(['email'], (err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'reg/code',
        payload: values,
      });
      const timeChange = setInterval(() => {
        const { time } = this.state;
        const newData = time;
        this.setState(
          {
            time: newData - 1,
            btnContent: newData - 1 + 's后重发',
            btnDisable: true,
            send: true,
            email: values.email,
          },
          () => {
            if (this.state.time === 0) {
              clearInterval(timeChange);
              this.setState({
                btnDisable: false,
                time: 60,
                btnContent: '发送验证码',
              });
            }
          },
        );
      }, 1000);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    return (
      <div style={{ width: '30%', marginLeft: '35%', marginTop: '50px' }}>
        <Spin spinning={loading == undefined ? false : loading}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              <div style={{ marginLeft: '40%', fontSize: 30 }}>用户注册</div>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入8~11个英文字母或数字', min: 8, max: 11 },
                  {
                    pattern: /^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)+$/,
                    message: '名称只能输入英文，数字.',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('nickname', {
                rules: [
                  { required: true, message: '昵称长度为4-8', min: 4, max: 8 },
                  {
                    pattern: /^(?:([A-Za-z0-9_\u4e00-\u9fa5]+(\s+)?)+)?([A-Za-z0-9_\u4e00-\u9fa5]+)$/,
                    message: '名称只能输入英文，数字，汉字或者下划线',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="昵称"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: '请输入邮箱', min: 1 },
                  {
                    pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    message: '请输入正确格式的邮箱.',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="邮箱"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入验证码', min: 1 }],
              })(
                <Search
                  placeholder="input search text"
                  enterButton={
                    <Button type="primary" disabled={this.state.btnDisable}>
                      {this.state.btnContent}
                    </Button>
                  }
                  onSearch={this.send}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入8~20个英文字母或数字', min: 8, max: 20 },
                  {
                    pattern: /^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)+$/,
                    message: '名称只能输入英文，数字.',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password1', {
                rules: [
                  { required: true, message: '请输入8~20个英文字母或数字', min: 8, max: 20 },
                  {
                    pattern: /^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)+$/,
                    message: '名称只能输入英文，数字.',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="再次输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                注册
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { Code } = state.reg;
  return {
    loading: state.loading.models.reg,
    Code,
  };
}

export default Form.create()(connect(mapStateToProps)(Index));
