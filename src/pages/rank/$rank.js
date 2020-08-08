/* eslint-disable */

import React from 'react';
import { Table, Divider, Tag, Pagination, Modal, Button, message, Row, Col, Input } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import Link from 'umi/link';

const { Search } = Input;

const data = [];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
    };
  }

  // componentWillMount() {
  //   if (sessionStorage.getItem('username') === null) {
  //     message.loading('请登录', 0.5);
  //     router.push('/');
  //   }
  // }

  onChange = e => {
    const { location } = this.props;
    if (JSON.stringify(location.query) == '{}') {
      router.push(`/rank/${e}`);
    } else {
      router.push(`/rank/${e}${location.search}`);
    }
  };

  onSearch = e => {
    if (e == '') router.push(router.push(`/rank/1`));
    else router.push(`/rank/1?name=${e}`);
  };

  showModal = item => {
    if (item === null || item.length === 0) {
      item = [{}];
      this.setState({
        visible: true,
        data: [],
      });
    } else {
      item = item.replace(/x/g, '"x"');
      item = item.replace(/y/g, '"y"');
      item = item.slice(0, -2) + ']';
      this.setState({
        visible: true,
        data: JSON.parse(item),
      });
    }
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
  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'sid',
        key: 'sid',
        // render: text => <a>{text}</a>,
      },
      {
        title: '用户名',
        dataIndex: '',
        key: '',
        render: text => {
          return <Link to={`/rank/1?name=${text.username}`}>{text.username}</Link>;
        },
      },
      {
        title: '昵称',
        dataIndex: '',
        key: '',
        render: text => {
          return <Link to={`/rank/1?name=${text.username}`}>{text.nickname}</Link>;
        },
      },
      {
        title: '文章',
        dataIndex: '',
        key: '',
        render: text => {
          return <Link to={'/practice/message/' + text.mid}>{text.mesname}</Link>;
        },
      },
      {
        title: '打字速度',
        dataIndex: 'speed',
        key: 'speed',
        render: speed => `${speed}KPM`,
      },
      {
        title: '正确率',
        dataIndex: 'correct_rate',
        key: 'correct_rate',
        render: correct_rate => `${correct_rate}%`,
      },
      {
        title: '等级',
        dataIndex: 'grade',
        key: 'grade',
      },
      {
        title: '打字总数',
        dataIndex: 'wordnum',
        key: 'wordnum',
      },
      {
        title: '打字时间',
        dataIndex: 'wrtime',
        key: 'wrtime',
      },
      {
        title: '提交时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '速度曲线',
        dataIndex: 'instan',
        key: 'instan',
        render: instan => (
          <Button size="small" type="primary" onClick={() => this.showModal(instan)}>
            速度曲线
          </Button>
        ),
      },
    ];
    const { StatusNum, RankList, loading, location } = this.props;
    let num = StatusNum;
    let reg = /^\d+$/;
    let path = location.pathname.split('/');
    let page = 0;
    if (reg.test([path[2]])) {
      page = parseInt(path[2]);
    }
    if (RankList === undefined || RankList.length === 0) {
      num = 0;
    }
    const cols = {
      x: {
        min: 0,
      },
      y: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <Row>
          <Col span={6}>
            <Search placeholder="输入用户账号" onSearch={this.onSearch} enterButton />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              className="responsive-table"
              pagination={false}
              loading={loading}
              columns={columns}
              dataSource={RankList}
              rowKey="sid"
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
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="80%"
        >
          <Chart height={400} data={this.state.data} scale={cols} forceFit>
            <Axis name="x" />
            <Axis name="y" />
            <Tooltip showTitle={false} />
            <Geom
              type="line"
              position="x*y"
              size={2}
              shape={'smooth'}
              tooltip={[
                'x*y',
                (x, y) => {
                  return {
                    name: '时间',
                    value: x + 's',
                  };
                },
              ]}
            />
            <Geom
              type="line"
              position="x*y"
              size={2}
              shape={'smooth'}
              tooltip={[
                'x*y',
                (x, y) => {
                  return {
                    name: '速度',
                    value: y + 'KPM',
                  };
                },
              ]}
            />
            <Geom
              type="point"
              position="x*y"
              size={4}
              shape={'circle'}
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
            />
          </Chart>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { StatusNum, RankList } = state.rank;
  return {
    loading: state.loading.models.rank,
    StatusNum,
    RankList,
  };
}

export default connect(mapStateToProps)(Index);
