/* eslint-disable */

import React from 'react'
import { Table, Divider, Tag, Pagination, Modal, Button } from 'antd'
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

    onChange = (e) => {
        router.push(`/rank/${e}`);
    }

    showModal = (item) => {
        if (item === null || item.length === 0) {
            item = [{}];
            this.setState({
                visible: true,
                data: []
            });
        }
        else {
            item = item.replace(/x/g, '"x"')
            item = item.replace(/y/g, '"y"')
            item = item.slice(0, -2) + ']'
            this.setState({
                visible: true,
                data: JSON.parse(item)
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
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '昵称',
                dataIndex: 'nickname',
                key: 'nickname',
            },
            {
                title: '文章',
                dataIndex: 'mesname',
                key: 'mesname',
            },
            {
                title: '打字速度',
                dataIndex: 'speed',
                key: 'speed',
                render: (speed) => `${speed}KPM`,

            },
            {
                title: '正确率',
                dataIndex: 'correct_rate',
                key: 'correct_rate',
                render: (correct_rate) => `${correct_rate}%`,
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
                render: (instan) => <Button size='small' type="primary" onClick={() => this.showModal(instan)}>
                    速度曲线
              </Button>,
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
                min: 0
            },
            y: {
                range: [0, 1]
            }
        };
        return (
            <div>
                <div>
                    <Table
                        pagination={false}
                        loading={loading}
                        columns={columns}
                        dataSource={RankList}
                        rowKey='sid'
                    />
                    <div style={{ float: 'right', marginTop: 10 }}>
                        <Pagination
                            showQuickJumper
                            defaultCurrent={page}
                            total={num}
                            onChange={(page) => this.onChange(page)}
                        />
                    </div>
                </div>
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
                        <Geom type="line" position="x*y" size={2}
                            shape={"smooth"}
                            tooltip={['x*y', (x, y) => {
                                return {
                                    name: '时间',
                                    value: x + 's',
                                };
                            }]}
                        />
                        <Geom type="line" position="x*y" size={2}
                            shape={"smooth"}
                            tooltip={['x*y', (x, y) => {
                                return {
                                    name: '速度',
                                    value: y + 'KPM',
                                };
                            }]}
                        />
                        <Geom
                            type="point"
                            position="x*y"
                            size={4}
                            shape={"circle"}
                            style={{
                                stroke: "#fff",
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { StatusNum, RankList } = state.rank
    return {
        loading: state.loading.models.rank,
        StatusNum,
        RankList
    }
}

export default connect(mapStateToProps)(Index);
