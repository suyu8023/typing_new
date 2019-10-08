import React from 'react';
import Header from './Header';
class MainLayout extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    // console.log(this.props);
  }

  render() {
    return (
      <Header {...this.props}>{this.props.children}</Header>
    );
  }
}
export default MainLayout;
