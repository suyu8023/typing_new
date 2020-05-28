import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import HeaderCss from './Header.css';
import Link from 'umi/link';
const { Header, Content, Footer } = Layout;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    const { location } = this.props;

    return (
      <Layout className="layout" style={{ height: '100%' }}>
        <Header>
          <div className={HeaderCss.logo} />
          {!location.pathname.includes('admin') ? (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="practice">
                <Link to="/practice/1">Practice</Link>
              </Menu.Item>
              <Menu.Item key="contest">
                <Link to="/contest/1">Contest</Link>
              </Menu.Item>
              <Menu.Item key="status">
                <Link to="/status/1">Status</Link>
              </Menu.Item>
              <Menu.Item key="rank">
                <Link to="/rank/1">Rank</Link>
              </Menu.Item>
              <Menu.Item key="login" style={{ marginLeft: '60%', backgroundColor: 'write' }}>
                {sessionStorage.getItem('username') === null ? (
                  <Link to="/login">登录</Link>
                ) : (
                  <a>{localStorage.getItem('username')}</a>
                )}
              </Menu.Item>
              <Menu.Item key="reg">
                {sessionStorage.getItem('username') === null ? (
                  <Link to="/reg">注册</Link>
                ) : (
                  <Link to="/login">退出</Link>
                )}
              </Menu.Item>
            </Menu>
          ) : (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="message">
                <Link to="/admin/message/1">Message</Link>
              </Menu.Item>
              <Menu.Item key="contest">
                <Link to="/admin/contest/1">Contest</Link>
              </Menu.Item>
              <Menu.Item key="user">
                <Link to="/admin/user/1">User</Link>
              </Menu.Item>
              <Menu.Item key="login" style={{ marginLeft: '60%', backgroundColor: 'write' }}>
                {sessionStorage.getItem('username') === null ? (
                  <Link to="/login">登录</Link>
                ) : (
                  <a>{localStorage.getItem('username')}</a>
                )}
              </Menu.Item>
              <Menu.Item key="reg">
                {sessionStorage.getItem('username') === null ? (
                  <Link to="/reg">注册</Link>
                ) : (
                  <Link to="/login">退出</Link>
                )}
              </Menu.Item>
            </Menu>
          )}
        </Header>
        <Content style={{ padding: '0 50px' }} id="content">
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div style={{ background: '#fff', padding: 24, height: '100%' }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', marginBottom: 0 }}>©2018 Created by suyu</Footer>
      </Layout>
    );
  }
}

export default Index;
