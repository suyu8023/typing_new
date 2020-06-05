/* eslint-disable */

import React from 'react';
import {
  Table,
  Divider,
  Tag,
  Button,
  Pagination,
  Input,
  message,
  Icon,
  Popconfirm,
  Modal,
  Form,
  Select,
  DatePicker,
  InputNumber,
  Row,
  Col,
} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import chinaTime from 'china-time';

const { TextArea, Search } = Input;
const { Option } = Select;

const data = [];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentWillMount() {
    if (sessionStorage.getItem('username') === null) {
      message.loading('请登录', 0.5);
      router.push('/');
    }
  }

  onChange = e => {
    const { location } = this.props;
    if (JSON.stringify(location.query) == '{}') {
      router.push(`/admin/contest/${e}`);
    } else {
      router.push(`/admin/contest/${e}${location.search}`);
    }
  };

  onSearch = e => {
    if (e == '') {
      router.push(`/admin/contest/1`);
    } else router.push(`/admin/contest/1?name=${e}`);
  };

  confirm = cid => {
    let obj = '{' + '"cid":' + '"' + cid + '"' + '}';
    obj = JSON.parse(obj);
    const { dispatch, location } = this.props;
    dispatch({
      type: 'admin_contest/deleteContest',
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
        values.begin_time = values.begin_time.format('YYYY-MM-DD HH:mm:ss');
        values.end_time = values.end_time.format('YYYY-MM-DD HH:mm:ss');
        values.autor = localStorage.getItem('username');
        values.mesname = values.mid.split('%')[1];
        values.mid = values.mid.split('%')[0];

        dispatch({
          type: 'admin_contest/addContest',
          payload: values,
        });
        this.handleCancel();
        router.push(location.pathname);
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
    const columns = [
      {
        title: 'ID',
        dataIndex: 'cid',
        key: 'cid',
      },
      {
        title: '比赛名称',
        dataIndex: 'contests_name',
        key: 'contests_name',
        // render: (text) => {
        //     if (chinaTime('YYYY-MM-DD HH:mm:ss') >= text.begin_time && chinaTime('YYYY-MM-DD HH:mm:ss') <= text.end_time) {
        //         localStorage.setItem(text.cid, true);
        //         return <Link to={'/contest/' + text.cid + '/message/' + text.mid}>{text.contests_name}</Link>
        //     }
        //     else{
        //         localStorage.setItem(text.cid, false);
        //        return <span>{text.contests_name}</span>
        //     }
        // }
      },
      {
        title: '作者',
        dataIndex: 'autor',
        key: 'autor',
      },
      {
        title: '开始时间',
        dataIndex: 'begin_time',
        key: 'begin_time',
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
        key: 'end_time',
      },
      {
        title: '测试时间',
        dataIndex: 'times',
        key: 'times',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '操作',
        dataIndex: '',
        key: '',
        render: text => {
          return (
            <div>
              <Link to={'/admin/contest/cid/' + text.cid}>
                <Icon type="edit" />
              </Link>
              {/* <Link to={'/admin/message/mid/' + text.mid} style={{ marginLeft: 20, color: 'red' }}>
                            <Icon type="delete" />
                        </Link> */}
              <Popconfirm
                title="是否确定删除？"
                onConfirm={() => this.confirm(text.cid)}
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
    const { ContestNum, ContestList, loading, location } = this.props;
    let num = ContestNum;
    let reg = /^\d+$/;
    let path = location.pathname.split('/');
    let page = 0;
    if (reg.test([path[3]])) {
      page = parseInt(path[3]);
    }
    if (ContestList === undefined || ContestList.length === 0) {
      num = 0;
    }
    const { AllMessage } = this.props;
    return (
      <div>
        <div>
          <Row>
            <Col span={2}>
              <Button type="primary" onClick={this.showModal}>
                添加比赛
              </Button>
            </Col>
            <Col span={6}>
              <Search placeholder="输入比赛名" onSearch={this.onSearch} enterButton />
            </Col>
          </Row>

          <Table
            pagination={false}
            loading={loading}
            columns={columns}
            dataSource={ContestList}
            rowKey="cid"
          />
          <div style={{ float: 'right', marginTop: 10 }}>
            <Pagination
              showQuickJumper
              defaultCurrent={page}
              total={num}
              onChange={page => this.onChange(page)}
            />
          </div>
        </div>
        <Modal
          title="增加比赛"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="比赛名称">
              {getFieldDecorator('contests_name', {
                rules: [{ required: true, message: '请输入1~11个字符', min: 1, max: 11 }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="比赛文章">
              {getFieldDecorator('mid', {
                rules: [{ required: true, message: '请选择等级' }],
              })(
                <Select style={{ width: '100%' }}>
                  {AllMessage === undefined
                    ? null
                    : AllMessage.map(item => {
                        return <Option value={item.mid + '%' + item.name}>{item.name}</Option>;
                      })}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="比赛时间">
              {getFieldDecorator('times', {
                rules: [{ required: true, message: '请输入比赛时间' }],
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="开始时间">
              {getFieldDecorator('begin_time', {
                rules: [{ required: true, message: '请输入开始时间' }],
              })(<DatePicker showTime placeholder="Select Time" />)}
            </Form.Item>
            <Form.Item label="结束时间">
              {getFieldDecorator('end_time', {
                rules: [{ required: true, message: '请输入结束时间' }],
              })(<DatePicker showTime placeholder="Select Time" />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                增加
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { ContestNum, ContestList, AllMessage } = state.admin_contest;
  return {
    loading: state.loading.models.admin_contest,
    ContestNum,
    ContestList,
    AllMessage,
  };
}

export default Form.create()(connect(mapStateToProps)(Index));
