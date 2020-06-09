/* eslint-disable */

import React from 'react';
import {
  Table,
  Divider,
  Select,
  Input,
  Pagination,
  message,
  Icon,
  Popconfirm,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Spin,
} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import ExcelUtil from '../../../util/excelUtil';
const { TextArea, Search } = Input;
const { Option } = Select;

const data = [];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      data: [],
    };
  }

  componentWillMount() {
    if (sessionStorage.getItem('username') === null) {
      message.loading('请登录', 0.5);
      router.push('/');
    }
    // console.log(typeof localStorage.getItem('status'));

    if (localStorage.getItem('status') !== '1') {
      message.loading('请用管理员账号登录', 0.5);
      router.push('/');
    }
  }

  onChange = e => {
    const { location } = this.props;
    if (JSON.stringify(location.query) == '{}') {
      router.push(`/admin/user/${e}`);
    } else {
      router.push(`/admin/user/${e}${location.search}`);
    }
  };

  onSearch = e => {
    if (e == '') {
      router.push(`/admin/user/1`);
    } else router.push(`/admin/user/1?name=${e}`);
  };

  confirm = uid => {
    let obj = '{' + '"uid":' + '"' + uid + '"' + '}';
    obj = JSON.parse(obj);
    const { dispatch, location } = this.props;
    dispatch({
      type: 'user/deleteUser',
      payload: {
        obj: obj,
        page: location.pathname.split('/')[3],
      },
    });
    router.push(location.pathname);
  };

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

  handleSubmit = e => {
    const { dispatch, location } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'user/addUser',
          payload: values,
        });
        this.handleCancel();
        router.push(location.pathname);
      }
    });
  };

  pri = (data, flag) => {
    this.setState({
      data: data,
      loading: flag ? !this.state.loading : this.state.loading,
    });
  };

  onExcel = e => {
    ExcelUtil.importExcel(this.pri, e, 'user');
  };

  upExcel = e => {
    const { dispatch } = this.props;
    if (this.state.data.length != 0) {
      console.log(this.state.data);

      dispatch({
        type: 'user/addUserList',
        payload: this.state.data,
      });
    }
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
    const columns = [
      {
        title: 'ID',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        // render: text => {
        //     return <Link to={'/practice/message/' + text.mid}>{text.name}</Link>
        // }
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '登陆时间',
        dataIndex: 'login_time',
        key: 'login_time',
      },
      {
        title: '注册时间',
        dataIndex: 'reg_time',
        key: 'reg_time',
      },
      {
        title: '操作',
        dataIndex: '',
        key: '',
        render: text => {
          return (
            <div>
              <Link to={'/admin/user/uid/' + text.uid}>
                <Icon type="edit" />
              </Link>
              {/* <Link to={'/admin/message/mid/' + text.mid} style={{ marginLeft: 20, color: 'red' }}>
                            <Icon type="delete" />
                        </Link> */}
              <Popconfirm
                title="是否确定删除？"
                onConfirm={() => this.confirm(text.uid)}
                // onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <a href="#" style={{ marginLeft: 20, color: 'red' }}>
                  <Icon type="delete" />
                </a>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    const { UserNum, UserList, loading, location } = this.props;
    let num = UserNum;
    let reg = /^\d+$/;
    let path = location.pathname.split('/');
    let page = 0;
    if (reg.test([path[3]])) {
      page = parseInt(path[3]);
    }
    if (UserList === undefined || UserList.length === 0) {
      num = 0;
    }

    return (
      <div>
        <div>
          <Spin spinning={this.state.loading} tip="文件上传中......">
            <Row>
              <Col span={2}>
                <Button type="primary" onClick={this.showModal}>
                  增加用户
                </Button>
              </Col>
              <Col span={6}>
                <Search placeholder="输入用户名" onSearch={this.onSearch} enterButton />
              </Col>
              <Col span={2}>
                <Button icon="plus" style={{ float: 'right' }}>
                  import
                  <Input
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    style={{
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                    onChange={e => {
                      this.onExcel(e);
                    }}
                  />
                </Button>
              </Col>
              <Col span={2} style={{ textAlign: 'center' }}>
                <Button type="primary" onClick={this.upExcel}>
                  导入
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table
                  className="responsive-table"
                  pagination={false}
                  loading={loading}
                  columns={columns}
                  dataSource={UserList}
                  rowKey="mid"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div style={{ float: 'right', marginTop: 10 }}>
                  <Pagination
                    showQuickJumper
                    defaultCurrent={page}
                    total={num}
                    onChange={page => this.onChange(page)}
                  />
                </div>
              </Col>
            </Row>
          </Spin>
        </div>
        <Modal
          title="增加用户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="用户名">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入1~11个字符', min: 1, max: 11 }],
                initialValue: '',
              })(<Input />)}
            </Form.Item>
            <Form.Item label="昵称">
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请输入1~11个字符', min: 1, max: 11 }],
                initialValue: '',
              })(<Input />)}
            </Form.Item>
            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
                initialValue: '',
                rules: [{ required: true, message: '请输入邮箱' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="等级">
              {getFieldDecorator('status', {
                initialValue: '',
                rules: [{ required: true, message: '请选择等级' }],
              })(
                <Select style={{ width: '100%' }}>
                  <Option value={1}>管理员</Option>
                  <Option value={2}>普通用户</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入8~20个字符', min: 8, max: 20 }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                添加
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { UserNum, UserList } = state.user;
  return {
    loading: state.loading.models.user,
    UserNum,
    UserList,
  };
}

export default Form.create()(connect(mapStateToProps)(Index));
