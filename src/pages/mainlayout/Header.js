import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import HeaderCss from './Header.css'
import Link from 'umi/link';
const { Header, Content, Footer } = Layout;


class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location  } = this.props;
    let path = location.pathname.split('/');  
    return (
      <Layout className="layout" style={{ height: '100%' }}>
        <Header>
          <div className={HeaderCss.logo} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[path[1]]}
            style={{ lineHeight: '64px' }}
            onClick={this.handleClick}
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
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, height: '100%',overflow: 'auto' }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2018 Created by suyu</Footer>
      </Layout>
    )
  }
}

export default Index;