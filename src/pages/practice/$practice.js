/* eslint-disable */

import React from 'react';
import { Table, Divider, Tag, Pagination, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';

const columns = [
  {
    title: 'ID',
    dataIndex: 'mid',
    key: 'mid',
  },
  {
    title: '标题',
    dataIndex: '',
    key: '',
    render: text => {
      return <Link to={'/practice/message/' + text.mid}>{text.name}</Link>;
    },
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
  },
  {
    title: '更新时间',
    dataIndex: 'upd_time',
    key: 'upd_time',
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
    router.push(`/practice/${e}`);
  };

  render() {
    const { MessageNum, MessageList, loading, location } = this.props;
    let num = MessageNum;
    let reg = /^\d+$/;
    let path = location.pathname.split('/');
    let page = 0;
    if (reg.test([path[2]])) {
      page = parseInt(path[2]);
    }
    if (MessageList === undefined || MessageList.length === 0) {
      num = 0;
    }
    return (
      <div>
        <div>
          <Table
            pagination={false}
            loading={loading}
            columns={columns}
            dataSource={MessageList}
            rowKey="mid"
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { MessageNum, MessageList } = state.practice;
  return {
    loading: state.loading.models.practice,
    MessageNum,
    MessageList,
  };
}

export default connect(mapStateToProps)(Index);
