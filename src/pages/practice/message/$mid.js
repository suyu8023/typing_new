import React from "react";
// import axios from "axios";
import CSS from "./mid.css";
import { connect } from 'dva'
import { List } from 'react-virtualized';

let hei = 0;
let flag = -1;
let counttime = false;
let true_num = 0;
let wrong_num = 0;
let num = 0;
let wrong_num1;
let true_num1;
let true_num2 = 0;
let back_num = 0;
let backFlag = true;
let qtime = 0;
function handleClick(e) {
  e.preventDefault();
}


class List1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.list,
      maxlen: 0,
      wrong_num: 0,
      true_num: 0,
    };
  }

  input = null;

  barkTwice = () => {
    if (this.input == null) {
      console.log("++++++")
    }
    this.input.focus();
  };

  oninput = e => {
    if (counttime === false) {
      this.props.countTime();
      counttime = true;
    }
    let i = parseInt(e.target.id.slice(4));
    if (i >= 3 && flag != i) {
      document.getElementById("qw").scrollTop = hei + 86;
      hei += 86;
      flag = i;
    }
    let value = e.target.value;
    let j = parseInt(e.target.value.length);
    let max = Math.max(j, this.state.maxlen);
    this.setState({
      maxlen: max
    })
    if (
      j >= 0 && j < this.state.value.length + 1
    ) {
      wrong_num1 = 0;
      true_num1 = 0;
      let data = this.state.value;
      for (let k = 0; k < data.length; k++) {
        if (j > k) {
          if (value[k] === data[k].value) {
            data[k].color = 'green';
            true_num1++;
          }
          else {
            data[k].color = 'red';
            wrong_num1++;
          }
        }
        else {
          data[k].color = '';
        }
      }
      true_num2 = true_num + true_num1;
      document.getElementById('num').innerText = num + true_num1 + wrong_num1;
      document.getElementById('true_num').innerText = true_num + true_num1;
      document.getElementById('wrong_num').innerText = wrong_num + wrong_num1;

      this.setState({
        value: data,
      });
    }
    if (j === this.state.value.length + 1 && value[j - 1] === " ") {
      const nextIndex = i + 1;
      num += true_num1 + wrong_num1;
      true_num2 = true_num + true_num1;
      true_num += true_num1;
      wrong_num += wrong_num1;
      document.getElementById('num').innerText = num;
      document.getElementById('true_num').innerText = true_num + true_num1;
      document.getElementById('wrong_num').innerText = wrong_num + wrong_num1;
      this.props.bark(nextIndex);
    }
  };



  render() {
    let index = this.props.index;
    let disable = {};
    const { activeIndex } = this.props;
    if (activeIndex !== index) {
      disable.disabled = "disabled";
    }
    return (
      <div className={CSS.read} id={"qaq" + index}>
        <div className={CSS.write} id={"show" + index}>
          {this.state.value.map((item) => {
            return (
              <span key={item.index} style={{ backgroundColor: item.color }}>
                {item.value}
              </span>
            );
          })}
        </div>
        <input
          onPaste={handleClick}
          onContextMenu={handleClick}
          onCopy={handleClick}
          onCut={handleClick}
          className={CSS.write}
          id={"read" + index}
          onChange={item => this.oninput(item)}
          {...disable}
          ref={ref => (this.input = ref)}
        />
      </div>
    );
  }
}

class ShowMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  list = [];

  countTime = () => {
    qtime++;
    if (document.getElementById('time') != null && document.getElementById('speed') != null) {
      document.getElementById('time').innerText = (Array(2).join('0') + Math.floor(qtime / 60)).slice(-2) + ':' + (Array(2).join('0') + Math.floor(qtime % 60)).slice(-2);
      document.getElementById('speed').innerText = (true_num2 / (Math.floor(qtime / 60) * 60 + Math.floor(qtime % 60)) * 60).toFixed(2) + 'KPM';
      setTimeout(this.countTime, 1000);
    }
  }

  bark = index => {
    this.setState(
      {
        activeIndex: index
      },

      () => {
        if (this.list[index] != null) {
          this.list[index].barkTwice()
        }
      }
    );
  };

  render() {
    let date = this.props.date;
    let input = this.props.in;
    console.log(date);

    return (
      <div>
        <span style={{ fontSize: 30 }}>时间: <span id='time' style={{ color: 'red' }}>00:00</span></span>
        <span style={{ fontSize: 30 }}> 速度:<span id='speed'>0KPM</span></span>
        <span style={{ fontSize: 30 }}> 打字总数:<span id='num'>0</span></span>
        <span style={{ fontSize: 30 }}> 正确字数:<span id='true_num'>0</span></span>
        <span style={{ fontSize: 30 }}> 错误字数:<span id='wrong_num'>0</span></span>

        <div id='qw' style={{ height: 680, overflow: 'hidden' }}>
          {date.map((item, index) => {
            return (
              <List1 id='list'
                key={index}
                id={"qaq" + item.mid}
                list={item}
                index={index}
                in={input}
                activeIndex={this.state.activeIndex}
                bark={this.bark}
                ref={ref => (this.list[index] = ref)}
                countTime={this.countTime}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date1: []
    };
  }

  render() {
    // console.log(document.getElementById('qw'));
    const { loading } = this.props;
    let date3 = [];
    const { Message } = this.props;
    let date = Message;
    if (Message != undefined) {
      date = date.replace(/\n/g, " ");
      date = date.split(/\s+/);
      let date1 = [];
      let str = "";
      for (let i = 0; i < date.length; i++) {
        if (i % 20 === 0 && i !== 0) {
          date1.push(str);
          str = date[i];
        } else {
          if (i === 0) {
            str = str + date[i];
          } else {
            str += " " + date[i];
          }
        }
      }
      date1.push(str);
      date3 = [];
      let xx = 0;
      for (let i = 0; i < date1.length; i++) {
        let date2 = [];
        for (let j = 0; j < date1[i].length; j++) {
          let s = {};
          s.index = xx++;
          s.color = "";
          s.value = date1[i][j];
          date2.push(s);
        }
        date3.push(date2);
      }
    }
    console.log(loading);

    return (
      <div>
        {loading ?
          null : 
          <ShowMessage
            {...this.props}
            date={date3}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { Message } = state.mid
  return {
    loading: state.loading.models.mid,
    Message
  }
}

export default connect(mapStateToProps)(Detail);