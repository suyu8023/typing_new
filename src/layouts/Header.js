// import React from 'react'
// import { Layout, Menu, Breadcrumb } from 'antd';
// import HeaderCss from './Header.css'
// import Practice from '../pages/practice/index'
// import Link from 'umi/link';
// import { connect } from 'dva'
// import {withRouter} from "react-router-dom";
// const { Header, Content, Footer } = Layout;


// class Index extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             type: 0
//         }
//     }

//     handleClick = (e) => {
//         console.log(e.key);
//         this.setState({
//             type: e.key
//         })
//     }

//     render() {
//         const { location } = this.props;
//         return (
//             <Layout className="layout" style={{ height: '100%' }}>
//                 <Header>
//                     <div className={HeaderCss.logo} />
//                     <Menu
//                         theme="dark"
//                         mode="horizontal"
//                         defaultSelectedKeys={[]}
//                         style={{ lineHeight: '64px' }}
//                         onClick={this.handleClick}
//                     >
//                         <Menu.Item key="1">
//                             <Link to="/practice">Practice</Link></Menu.Item>
//                         <Menu.Item key="2">Contest</Menu.Item>
//                         <Menu.Item key="3">Status</Menu.Item>
//                         <Menu.Item key="4">Rank</Menu.Item>
//                     </Menu>
//                 </Header>
//                 <Content style={{ padding: '0 50px' }}>
//                     <Breadcrumb style={{ margin: '16px 0' }}>
//                     </Breadcrumb>
//                     <div style={{ background: '#fff', padding: 24, height: '100%' }}>
//                         {this.state.type === '1' ? <Practice {...this.props}></Practice> : 'contest'}
//                     </div>
//                 </Content>
//                 <Footer style={{ textAlign: 'center' }}>©2018 Created by suyu</Footer>
//             </Layout>
//         )
//     }
// }

// export default Index;