import React from 'react'
import { Layout, Menu, Breadcrumb, Modal, Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
import HeaderCss from './Header.css'
import Link from 'umi/link';
import { connect } from 'dva'
const { Header, Content, Footer } = Layout;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
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

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, dispatch } = this.props
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            dispatch({
                type: 'header/login',
                payload: values
            })
            // this.handleCancel()
        })
    };


    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: !nextProps.Login
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.props;
        return (
            <Layout className="layout" style={{ height: '100%' }}>
                <Header>
                    <div className={HeaderCss.logo} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">
                            <Link to="/practice/1">Practice</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/contest/1">Contest</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/status/1">Status</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/rank/1">Rank</Link>
                        </Menu.Item>
                        <Menu.Item key="5" style={{ marginLeft: '60%', backgroundColor: 'write' }}>
                            <a onClick={this.showModal}>登录</a>
                        </Menu.Item>
                        <Menu.Item key="6" >
                            <a>注册</a>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }} id='content'>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, height: '100%' }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 Created by suyu</Footer>
                <Modal
                    title="登录"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Spin spinning={loading == undefined ? false: loading}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入8~12个英文字母或数字', min: 8, max: 12 },
                                    { pattern: /^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)+$/, message: '名称只能输入英文，数字.' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入8~20个英文字母或数字', min: 8, max: 20 },
                                    { pattern: /^[A-Za-z0-9]+(\.?[A-Za-z0-9]+)+$/, message: '名称只能输入英文，数字.' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    登录
                            </Button>
                                <Button type="primary" style={{ width: '100%' }}>
                                    注册
                            </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Modal>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    const { Login } = state.header
    return {
        loading: state.loading.models.header,
        Login
    }
}

export default Form.create()(connect(mapStateToProps)(Index));