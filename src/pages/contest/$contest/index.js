/* eslint-disable */

import React from 'react';
import { Table, Divider, Tag, Pagination, message, Input, Row, Col } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import chinaTime from 'china-time';
const { Search } = Input;
const columns = [
  {
    title: 'ID',
    dataIndex: 'cid',
    key: 'cid',
  },
  {
    title: '比赛名称',
    dataIndex: '',
    key: '',
    render: text => {
      if (
        chinaTime('YYYY-MM-DD HH:mm:ss') >= text.begin_time &&
        chinaTime('YYYY-MM-DD HH:mm:ss') <= text.end_time
      ) {
        localStorage.setItem(text.cid, true);
        return (
          <Link to={'/contest/' + text.cid + '/message/' + text.mid}>{text.contests_name}</Link>
        );
      } else {
        localStorage.setItem(text.cid, false);
        return <span>{text.contests_name}</span>;
      }
    },
  },
  {
    title: '详情',
    dataIndex: '',
    key: '',
    render: text => {
      return <Link to={'/contest/' + text.cid + '/rank/1'}>查看详情</Link>;
    },
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
    title: '状态',
    dataIndex: '',
    key: '',
    render: text => {
      // console.log(chinaTime('YYYY-MM-DD HH:mm:ss') > text.begin_time);

      if (
        chinaTime('YYYY-MM-DD HH:mm:ss') >= text.begin_time &&
        chinaTime('YYYY-MM-DD HH:mm:ss') <= text.end_time
      ) {
        return <span style={{ color: 'green' }}>running</span>;
      } else if (chinaTime('YYYY-MM-DD HH:mm:ss') > text.end_time) {
        return <span style={{ color: 'red' }}>end</span>;
      } else if (chinaTime('YYYY-MM-DD HH:mm:ss') < text.begin_time) {
        return <span style={{ color: 'gray' }}>waiting</span>;
      }
    },
  },
];

const data = [];

class Index extends React.Component {
  constructor(props) {
    super(props);
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
      router.push(`/contest/${e}`);
    } else {
      router.push(`/contest/${e}${location.search}`);
    }
  };

  onSearch = e => {
    if (e == '') {
      router.push(`/contest/1`);
    } else router.push(`/contest/1?name=${e}`);
  };

  render() {
    const { ContestNum, ContestList, loading, location } = this.props;
    let num = ContestNum;
    let reg = /^\d+$/;
    let path = location.pathname.split('/');
    let page = 0;
    if (reg.test([path[2]])) {
      page = parseInt(path[2]);
    }
    if (ContestList === undefined || ContestList.length === 0) {
      num = 0;
    }
    return (
      <div>
        <Row>
          <Col span={6}>
            <Search placeholder="输入比赛名" onSearch={this.onSearch} enterButton />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              className="responsive-table"
              pagination={false}
              loading={loading}
              columns={columns}
              dataSource={ContestList}
              rowKey="cid"
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { ContestNum, ContestList } = state.contest;
  return {
    loading: state.loading.models.contest,
    ContestNum,
    ContestList,
  };
}

export default connect(mapStateToProps)(Index);
