import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Co } from 'antd';
import HeaderCss from './Header.css';
import Link from 'umi/link';
import classNames from 'classnames';
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
      <Layout
        className={classNames({
          'full-width-page': true,
        })}
        style={{ height: '100%' }}
      >
        <Header className={HeaderCss.Header}>
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
              <Menu.Item
                key="reg"
                className={HeaderCss.right}
                style={{ float: 'right', backgroundColor: 'write' }}
              >
                {sessionStorage.getItem('username') === null ? (
                  <Link to="/reg">注册</Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                    }}
                  >
                    退出
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item key="login" style={{ float: 'right', backgroundColor: 'write' }}>
                {sessionStorage.getItem('username') === null ? (
                  <Link to="/login">登录</Link>
                ) : (
                  <Link to={`/user/${localStorage.getItem('username')}`}>
                    {localStorage.getItem('username')}
                  </Link>
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
              <Menu.Item
                key="reg"
                className={HeaderCss.right}
                style={{ float: 'right', backgroundColor: 'write' }}
              >
                {sessionStorage.getItem('username') === null ? (
                  <Link to="/reg">注册</Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                    }}
                  >
                    退出
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item key="login" style={{ float: 'right', backgroundColor: 'write' }}>
                {sessionStorage.getItem('username') === null ? (
                  <Link to="/login">登录</Link>
                ) : (
                  <Link to={`/user/${localStorage.getItem('username')}`}>
                    {localStorage.getItem('username')}
                  </Link>
                )}
              </Menu.Item>
            </Menu>
          )}
        </Header>
        <Content id="content">
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div
            className={'responsive'}
            style={{
              background: '#fff',
              padding: 24,
              height: '100%',
              minHeight: 380,
            }}
          >
            {this.props.children}
          </div>
        </Content>
        <Footer className={HeaderCss.footer} style={{ textAlign: 'center' }}>
          ©2020 Created by suyu
        </Footer>
      </Layout>
    );
  }
}

export default Index;
