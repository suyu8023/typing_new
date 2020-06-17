/* eslint-disable */

import React from 'react';
import { Table, Divider, Tag, Pagination, Modal, Button, message, Input, Row, Col } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import Link from 'umi/link';
import styles from './style.less';
const { Search } = Input;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
    };
  }

  componentWillMount() {
    if (sessionStorage.getItem('username') === null) {
      message.loading('请登录', 0.5);
      router.push('/');
    }
  }

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

  onChange = e => {
    const { location } = this.props;
    let list = location.pathname.split('/');
    if (JSON.stringify(location.query) == '{}') {
      router.push(`/contest/${list[2]}/rank/${e}`);
    } else {
      router.push(`/contest/${list[2]}/rank/${e}${location.search}`);
    }
  };

  onSearch = e => {
    const { location } = this.props;
    let list = location.pathname.split('/');
    if (e == '') {
      router.push(`/contest/${list[2]}/rank/1`);
    } else router.push(`/contest/${list[2]}/rank/1?name=${e}`);
  };

  render() {
    const { location } = this.props;
    let list = location.pathname.split('/');
    const columns = [
      {
        title: 'ID',
        dataIndex: 'csid',
        key: 'csid',
        // render: text => <a>{text}</a>,
      },
      {
        title: '用户名',
        dataIndex: '',
        key: '',
        render: text => {
          return (
            <Link to={`/contest/${list[2]}/rank/1?name=${text.username}`}>{text.username}</Link>
          );
        },
      },
      {
        title: '昵称',
        dataIndex: '',
        key: '',
        render: text => {
          return (
            <Link to={`/contest/${list[2]}/rank/1?name=${text.username}`}>{text.nickname}</Link>
          );
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
        render: text => {
          if (text === '优秀,继续保持!') {
            return <span style={{ color: 'red' }}>{text}</span>;
          } else if (text === '及格,继续努力!') {
            return <span style={{ color: '#090' }}>{text}</span>;
          } else if (text === '不及格,加强练习!') {
            return <span style={{ color: '#25a6ef' }}>{text}</span>;
          } else if (text === '良好,继续加油!') {
            return <span style={{ color: '#B30099' }}>{text}</span>;
          }
        },
      },
      {
        title: '打字总数',
        dataIndex: 'wordnum',
        key: 'wordnum',
      },
      {
        title: '退格总数',
        dataIndex: 'backnum',
        key: 'backnum',
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
    const { ContestRankNum, ContestRankList, loading, Contest } = this.props;
    let num = ContestRankNum;
    let reg = /^\d+$/;
    let path = location.pathname.split('/');
    let page = 0;
    if (reg.test([path[4]])) {
      page = parseInt(path[4]);
    }
    if (ContestRankList === undefined || ContestRankList.length === 0) {
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
            <Search placeholder="输入用户名" onSearch={this.onSearch} enterButton />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              className="responsive-table"
              rowClassName={record => {
                if (record.username == sessionStorage.getItem('username')) return styles.green;
              }}
              pagination={false}
              loading={loading}
              columns={columns}
              dataSource={ContestRankList}
              rowKey="csid"
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
  const { ContestRankNum, ContestRankList } = state.contest_rank;
  return {
    loading: state.loading.models.contest_rank,
    ContestRankNum,
    ContestRankList,
  };
}

export default connect(mapStateToProps)(Index);
