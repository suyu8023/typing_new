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
const { TextArea, Search } = Input;
const { Option } = Select;
import ExcelUtil from '../../../util/excelUtil';
import moment from 'moment';

const data = [];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
    };
  }

  componentWillMount() {
    if (sessionStorage.getItem('username') === null) {
      message.loading('请登录', 0.5);
      router.push('/');
    }
    if (localStorage.getItem('status') !== '1') {
      message.loading('请用管理员账号登录', 0.5);
      router.push('/');
    }
  }

  onChange = e => {
    const { location } = this.props;
    if (JSON.stringify(location.query) == '{}') {
      router.push(`/admin/message/${e}`);
    } else {
      router.push(`/admin/message/${e}${location.search}`);
    }
  };

  onSearch = e => {
    if (e == '') router.push(router.push(`/admin/message/1`));
    else router.push(`/admin/message/1?name=${e}`);
  };

  confirm = mid => {
    let obj = '{' + '"mid":' + '"' + mid + '"' + '}';
    obj = JSON.parse(obj);
    const { dispatch, location } = this.props;
    dispatch({
      type: 'message/deleteMessage',
      payload: {
        obj: obj,
        page: location.pathname.split('/')[3],
      },
    });
    // router.push(location.pathname);
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
        values.autor = localStorage.getItem('nickname');
        dispatch({
          type: 'message/addMessage',
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
    ExcelUtil.importExcel(this.pri, e, 'message');
  };

  upExcel = e => {
    const { dispatch } = this.props;
    if (this.state.data.length != 0) {
      dispatch({
        type: 'message/addMessageList',
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
        dataIndex: 'mid',
        key: 'mid',
      },
      {
        title: '标题',
        dataIndex: 'name',
        key: 'name',
        // render: text => {
        //     return <Link to={'/practice/message/' + text.mid}>{text.name}</Link>
        // }
      },
      {
        title: '作者',
        dataIndex: 'autor',
        key: 'autor',
      },
      {
        title: '难度',
        dataIndex: 'diff',
        key: 'diff',
      },
      {
        title: '创建时间',
        dataIndex: 'rel_time',
        key: 'rel_time',
        render: text => {
          return <span>{moment(text.rel_time).format('YYYY-MM-DD HH:mm:ss')}</span>;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'upd_time',
        key: 'upd_time',
        render: text => {
          return <span>{moment(text.upd_time).format('YYYY-MM-DD HH:mm:ss')}</span>;
        },
      },
      {
        title: '操作',
        dataIndex: '',
        key: '',
        render: text => {
          return (
            <div>
              <Link to={'/admin/message/mid/' + text.mid}>
                <Icon type="edit" />
              </Link>
              {/* <Link to={'/admin/message/mid/' + text.mid} style={{ marginLeft: 20, color: 'red' }}>
                            <Icon type="delete" />
                        </Link> */}
              <Popconfirm
                title="是否确定删除？"
                onConfirm={() => this.confirm(text.mid)}
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
    const { MessageNum, MessageList, loading, location } = this.props;
    let num = MessageNum;
    let reg = /^\d+$/;
    let path = location.pathname.split('/');
    let page = 0;
    if (reg.test([path[3]])) {
      page = parseInt(path[3]);
    }
    if (MessageList === undefined || MessageList.length === 0) {
      num = 0;
    }
    return (
      <div>
        <div>
          <Spin spinning={this.state.loading} tip="文件上传中......">
            <Row>
              <Col span={2}>
                <Button type="primary" onClick={this.showModal}>
                  增加文章
                </Button>
              </Col>
              <Col span={6}>
                <Search placeholder="输入文章名" onSearch={this.onSearch} enterButton />
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
                  dataSource={MessageList}
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
          title="增加文章"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="标题">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入1~11个字符', min: 1, max: 11 }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="等级">
              {getFieldDecorator('diff', {
                rules: [{ required: true, message: '请选择等级' }],
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="简单">简单</Option>
                  <Option value="中等">中等</Option>
                  <Option value="困难">困难</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="文章内容">
              {getFieldDecorator('message', {
                rules: [{ required: true, message: '请输入文章内容' }],
              })(<TextArea rows={4} />)}
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
  const { MessageNum, MessageList } = state.message;
  return {
    loading: state.loading.models.message,
    MessageNum,
    MessageList,
  };
}

export default Form.create()(connect(mapStateToProps)(Index));
