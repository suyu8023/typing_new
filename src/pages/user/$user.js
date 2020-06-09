/* eslint-disable */

import React from 'react';
import {
  Row,
  Col,
  Card,
  Avatar,
  List,
  Icon,
  Skeleton,
  Upload,
  Button,
  Select,
  Form,
  Descriptions,
  Spin,
  Modal,
  Input,
  message,
} from 'antd';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import { connect } from 'dva';
import router from 'umi/router';
import SolutionCalendar from '../../components/SolutionCalendar';
import Link from 'umi/link';
const { Search } = Input;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solutionCalendarPeriod: null,
      visible: false,
      visible1: false,
      visible2: false,
      time: 60,
      btnDisable: false,
      btnContent: '发送验证码',
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  showModal1 = () => {
    this.setState({
      visible1: true,
    });
  };

  handleOk1 = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(['nickname'], (err, values) => {
      if (err) {
        return;
      }
      values.uid = localStorage.getItem('uid');
      dispatch({
        type: 'user_message/updateUser',
        payload: values,
      });
      this.setState({
        visible1: false,
      });
    });
  };

  handleCancel1 = e => {
    this.setState({
      visible1: false,
    });
  };

  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  };

  handleOk2 = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(['old_password', 'password1', 'password2'], (err, values) => {
      if (err) {
        return;
      }
      if (values.password1 !== values.password2) {
        message.error('两次密码输入不一样');
      } else {
        values.username = localStorage.getItem('username');
        values.uid = localStorage.getItem('uid');
        dispatch({
          type: 'user_message/updatePassword',
          payload: values,
        });
        this.setState({
          visible2: false,
        });
      }
    });
  };

  handleCancel2 = e => {
    this.setState({
      visible2: false,
    });
  };

  showModal3 = () => {
    this.setState({
      visible3: true,
    });
  };

  handleOk3 = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(['email', 'code'], (err, values) => {
      if (err) {
        return;
      }
      values.uid = localStorage.getItem('uid');
      dispatch({
        type: 'user_message/updateEmail',
        payload: values,
      });
      this.setState({
        visible3: false,
      });
    });
  };

  handleCancel3 = e => {
    this.setState({
      visible3: false,
    });
  };

  handleSolutionCalendarPeriodChange = value => {
    this.setState({ solutionCalendarPeriod: value });
  };

  send = e => {
    const { form, dispatch } = this.props;
    form.validateFields(['email'], (err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'user_message/code',
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
    const { solutionCalendarPeriod } = this.state;
    const { loading, UserRecord, User } = this.props;
    const { getFieldDecorator } = this.props.form;
    let that = this;
    const solutionCalendarYears = new Set();
    (UserRecord || []).forEach(d => {
      const year = +d.date.split('-')[0];
      solutionCalendarYears.add(year);
    });
    let ch_data = [];
    let ch = [];
    if (User) {
      ch = User.ch.split(',').map(Number);
      ch.forEach((item, index) => {
        if (index < 26) {
          ch_data.push({
            ch: String.fromCharCode(index + 'a'.charCodeAt()),
            num: item,
          });
        } else if (index < 52) {
          ch_data.push({
            ch: String.fromCharCode(index - 26 + 'A'.charCodeAt()),
            num: item,
          });
        }
      });
    }
    return (
      <div>
        {User != undefined ? (
          <div>
            <Row>
              <Col span={12} offset={6}>
                <Card>
                  <Descriptions title="User Info">
                    <Descriptions.Item label="UserName">{User.username}</Descriptions.Item>
                    <Descriptions.Item label="NickName">{User.nickname}</Descriptions.Item>
                    <Descriptions.Item label="Emile">{User.email}</Descriptions.Item>
                    <Descriptions.Item label="Last Login">{User.login_time}</Descriptions.Item>
                    <Descriptions.Item label="Register">{User.reg_time}</Descriptions.Item>
                    <Descriptions.Item label=""></Descriptions.Item>
                    <Descriptions.Item label="">
                      <Button shape="round" onClick={this.showModal}>
                        英文错字记录
                      </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label=""></Descriptions.Item>
                    <Descriptions.Item label=""></Descriptions.Item>
                    <Descriptions.Item label="">
                      <Button shape="round" onClick={this.showModal1}>
                        修改昵称
                      </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="">
                      <Button shape="round" onClick={this.showModal2}>
                        修改密码
                      </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="">
                      <Button shape="round" onClick={this.showModal3}>
                        修改邮箱
                      </Button>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col span={12} offset={6}>
                <Card>
                  <h3>
                    Record
                    <Select
                      defaultValue={null}
                      style={{ float: 'right' }}
                      size="small"
                      onChange={this.handleSolutionCalendarPeriodChange}
                    >
                      {Array.from(solutionCalendarYears).map(y => (
                        <Select.Option key={`${y}`} value={y}>
                          {y}
                        </Select.Option>
                      ))}
                      <Select.Option value={null}>Recent</Select.Option>
                    </Select>
                  </h3>
                  <SolutionCalendar
                    data={UserRecord}
                    startDate={
                      solutionCalendarPeriod ? `${solutionCalendarPeriod}-01-01` : undefined
                    }
                    endDate={solutionCalendarPeriod ? `${solutionCalendarPeriod}-12-31` : undefined}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        ) : null}
        <Modal
          title="英文错字记录"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="80%"
        >
          <Chart height={400} data={ch_data} forceFit>
            <Axis name="ch" />
            <Axis name="num" />
            <Tooltip showTitle={false} />
            <Geom
              type="interval"
              position="ch*num"
              size={10}
              shape={'smooth'}
              tooltip={[
                'ch*num',
                (ch, num) => {
                  return {
                    name: '字母',
                    value: ch,
                  };
                },
              ]}
            />
            <Geom
              type="interval"
              position="ch*num"
              size={10}
              shape={'smooth'}
              tooltip={[
                'ch*num',
                (ch, num) => {
                  return {
                    name: '打错数量',
                    value: num + '次',
                  };
                },
              ]}
            />
          </Chart>
        </Modal>
        <Modal
          title="修改昵称"
          visible={this.state.visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
        >
          <Form layout="vertical">
            <Form.Item label="Nickname">
              {getFieldDecorator('nickname', {
                rules: [
                  { required: true, message: '昵称长度为4-12', min: 4, max: 12 },
                  {
                    pattern: /^(?:([A-Za-z0-9_\u4e00-\u9fa5]+(\s+)?)+)?([A-Za-z0-9_\u4e00-\u9fa5]+)$/,
                    message: '名称只能输入英文，数字，汉字或者下划线',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="修改密码"
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
        >
          <Form.Item label="旧密码">
            {getFieldDecorator('old_password', {
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
          <Form.Item label="新密码">
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
                placeholder="输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item label="确认新密码">
            {getFieldDecorator('password2', {
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
        </Modal>
        <Modal
          title="修改邮箱"
          visible={this.state.visible3}
          onOk={this.handleOk3}
          onCancel={this.handleCancel3}
        >
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
                // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { UserRecord, User } = state.user_message;
  return {
    loading: state.loading.models.user_message,
    UserRecord,
    User,
  };
}

export default Form.create()(connect(mapStateToProps)(Index));
