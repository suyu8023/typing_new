import React from 'react';
// import axios from "axios";
import CSS from './mid.css';
import { connect } from 'dva';
import { List } from 'react-virtualized';
import router from 'umi/router';
import { message, Spin, Button, Input } from 'antd';

let hei = 0;
let flag = -1;
let counttime = false;
let true_num = 0;
let wrong_num = 0;
let num = 0;
let wrong_num1;
let true_num1;
let true_num2 = 0;
let line_data = '';
let qtime = 0;
let back_num = 0;
let ch = new Array(53).fill(0);
let ch1 = new Array(53).fill(0);
let ch2 = new Array(53).fill(0);
const A = /^[A-Z]+$/;
const a = /^[a-z]+$/;
let timeId;
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
    }
    this.input.focus();
  };

  countTime = () => {
    qtime++;
    if (document.getElementById('time') != null && document.getElementById('speed') != null) {
      document.getElementById('time').innerText =
        (Array(2).join('0') + Math.floor(qtime / 60)).slice(-2) +
        ':' +
        (Array(2).join('0') + Math.floor(qtime % 60)).slice(-2);
      document.getElementById('speed').innerText =
        Math.floor(qtime / 60) * 60 + Math.floor(qtime % 60) == 0
          ? 0
          : ((true_num2 / (Math.floor(qtime / 60) * 60 + Math.floor(qtime % 60))) * 60).toFixed(2) +
          'KPM';
      if (qtime % 5 == 0) {
        line_data =
          line_data +
          '{y:' + ((Math.floor(qtime / 60) * 60 + Math.floor(qtime % 60)) == 0
            ? 0
            : ((true_num2 / (Math.floor(qtime / 60) * 60 + Math.floor(qtime % 60))) * 60).toFixed(
              2,
            )) +
          ',x:' +
          qtime +
          '},';
      }
      timeId = setTimeout(this.countTime, 1000);
    }
  };

  componentWillUnmount() {
    counttime = false;
    qtime = -1;
    line_data = '';
    hei = 0;
    flag = -1;
    counttime = false;
    true_num = 0;
    wrong_num = 0;
    num = 0;
    wrong_num1 = 0;
    true_num1 = 0;
    true_num2 = 0;
    back_num = 0;
  }

  onkeyDown = e => {
    if (counttime && e.keyCode == 8) {
      back_num++;
    }
  };

  oninput = e => {
    if (counttime === false) {
      this.countTime();
      counttime = true;
      if (localStorage.getItem('ch') == '') {
        ch2 = JSON.parse(JSON.stringify(ch));
      } else {
        ch = JSON.parse(
          JSON.stringify(
            localStorage
              .getItem('ch')
              .split(',')
              .map(Number),
          ),
        );
        ch2 = JSON.parse(JSON.stringify(ch));
      }
      console.log(ch2);
    }
    let i = parseInt(e.target.id.slice(4));
    if (i >= 3 && flag != i) {
      document.getElementById('qw').scrollTop = hei + 86;
      hei += 86;
      flag = i;
    }
    let value = e.target.value;
    let j = parseInt(e.target.value.length);
    let max = Math.max(j, this.state.maxlen);
    this.setState({
      maxlen: max,
    });
    if (j >= 0 && j < this.state.value.length + 1) {
      wrong_num1 = 0;
      true_num1 = 0;
      ch1 = new Array(53).fill(0);
      ch = JSON.parse(JSON.stringify(ch2));
      let data = this.state.value;
      for (let k = 0; k < data.length; k++) {
        if (j > k) {
          if (value[k] === data[k].value) {
            data[k].color = '#4fb24f';
            true_num1++;
          } else {
            data[k].color = 'red';
            wrong_num1++;
            if (A.test(data[k].value)) {
              ch1[data[k].value.charCodeAt() - 'A'.charCodeAt() + 26]++;
            }
            if (a.test(data[k].value)) {
              ch1[data[k].value.charCodeAt() - 'a'.charCodeAt()]++;
            }
          }
        } else {
          data[k].color = '';
        }
      }
      true_num2 = true_num + true_num1;
      document.getElementById('num').innerText = num + true_num1 + wrong_num1;
      document.getElementById('true_num').innerText = true_num + true_num1;
      document.getElementById('wrong_num').innerText = wrong_num + wrong_num1;
      document.getElementById('back_num').innerText = back_num;
      document.getElementById('correct_rate').innerText =
        (num + true_num1 + wrong_num1 == 0
          ? 0
          : (((true_num + true_num1) / (num + true_num1 + wrong_num1)) * 100).toFixed(2)) + '%';
      for (let i = 0; i < 53; i++) {
        ch[i] += ch1[i];
      }
      this.setState({
        value: data,
      });
    }
    if (j === this.state.value.length + 1 && value[j - 1] === ' ') {
      const nextIndex = i + 1;
      num += true_num1 + wrong_num1;
      true_num2 = true_num + true_num1;
      true_num += true_num1;
      wrong_num += wrong_num1;
      document.getElementById('num').innerText = num;
      document.getElementById('true_num').innerText = true_num + true_num1;
      document.getElementById('wrong_num').innerText = wrong_num + wrong_num1;
      document.getElementById('back_num').innerText = back_num;
      document.getElementById('correct_rate').innerText =
        (num == 0 ? 0 : (((true_num + true_num1) / num) * 100).toFixed(2)) + '%';
      ch = JSON.parse(JSON.stringify(ch2));
      for (let i = 0; i < 53; i++) {
        ch[i] += ch1[i];
      }
      ch2 = JSON.parse(JSON.stringify(ch));
      this.props.bark(nextIndex);
    }
  };

  render() {
    let index = this.props.index;
    let disable = {};
    const { activeIndex } = this.props;
    if (activeIndex !== index) {
      disable.disabled = 'disabled';
    }
    return (
      <div className={CSS.read} id={'qaq' + index}>
        <div className={CSS.write} id={'show' + index}>
          {this.state.value.map(item => {
            return (
              <span key={item.index} style={{ backgroundColor: item.color }}>
                {item.value}
              </span>
            );
          })}
        </div>
        <input
          type="text"
          onPaste={handleClick}
          onContextMenu={handleClick}
          onCopy={handleClick}
          onCut={handleClick}
          autoComplete="off"
          className={CSS.write}
          id={'read' + index}
          onChange={item => this.oninput(item)}
          onKeyDown={this.onkeyDown}
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

  bark = index => {
    this.setState(
      {
        activeIndex: index,
      },

      () => {
        if (this.list[index] != null) {
          this.list[index].barkTwice();
        }
      },
    );
  };

  handleSub = () => {
    let time = document.getElementById('time').innerText;
    let speed = document.getElementById('speed').innerText;
    let num = document.getElementById('num').innerText;
    let true_num = document.getElementById('true_num').innerText;
    let wrong_num = document.getElementById('wrong_num').innerText;
    let correct_rate = document.getElementById('correct_rate').innerText;
    speed = parseFloat(speed.slice(0, speed.length - 3));
    correct_rate = parseFloat(correct_rate.slice(0, correct_rate.length - 1));

    let str = '不及格,加强练习!';
    if (speed >= 200.0 && correct_rate >= 95.0) {
      str = '优秀,继续保持!';
    } else if (speed >= 170.0 && correct_rate >= 95.0) {
      str = '良好,继续加油!';
    } else if (speed >= 110.0 && correct_rate >= 95.0) {
      str = '及格,继续努力!';
    }
    let obj = {
      status: {
        uid: this.props.session.data.uid,
        mid: this.props.location.pathname.split('/')[3],
        username: localStorage.getItem('username'),
        nickname: localStorage.getItem('nickname'),
        speed: speed,
        correct_rate: correct_rate,
        wordnum: num,
        wrtime: time,
        instan: '[' + line_data + ']',
        grade: str,
        mesname: this.props.Mename,
        backnum: back_num,
      },
      ch: {
        uid: this.props.session.data.uid,
        ch: ch.join(','),
      },
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'mid/subPractice',
      payload: obj,
    });
  };

  render() {
    let date = this.props.date;
    // let input = this.props.in;

    return (
      <div>
        <span style={{ fontSize: 30 }}>
          时间:{' '}
          <span id="time" style={{ color: 'red' }}>
            00:00
          </span>
        </span>
        <span style={{ fontSize: 30 }}>
          {' '}
          速度:<span id="speed">0KPM</span>
        </span>
        <span style={{ fontSize: 30 }}>
          {' '}
          正确率:<span id="correct_rate">0%</span>
        </span>
        <span style={{ fontSize: 30 }}>
          {' '}
          打字总数:<span id="num">0</span>
        </span>
        <span style={{ fontSize: 30 }}>
          {' '}
          正确字数:<span id="true_num">0</span>
        </span>
        <span style={{ fontSize: 30 }}>
          {' '}
          错误字数:<span id="wrong_num">0</span>
        </span>
        <span style={{ fontSize: 30 }}>
          {' '}
          退格字数:<span id="back_num">0</span>
        </span>
        <span style={{ float: 'right' }}>
          <Button type="primary" onClick={this.handleSub}>
            提交
          </Button>
        </span>

        <div id="qw" style={{ height: 680, overflow: 'hidden' }}>
          {date.map((item, index) => {
            return (
              <List1
                id="list"
                key={index}
                id={'qaq' + item.mid}
                list={item}
                index={index}
                // in={input}
                activeIndex={this.state.activeIndex}
                bark={this.bark}
                ref={ref => (this.list[index] = ref)}
              // countTime={this.countTime}
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
      date1: [],
      msname: '',
    };
  }

  // componentWillMount() {
  //   if (sessionStorage.getItem('username') === null) {
  //     message.loading('请登录', 0.5);
  //     router.push('/');
  //   }
  // }

  render() {
    const { loading } = this.props;
    let date3 = [];
    const { Message } = this.props;
    let date = Message;
    if (Message != undefined) {
      date = date.replace(/\n/g, ' ');
      date = date.split(/\s+/);
      let date1 = [];
      let str = '';
      for (let i = 0; i < date.length; i++) {
        if (i % 20 === 0 && i !== 0) {
          date1.push(str);
          str = date[i];
        } else {
          if (i === 0) {
            str = str + date[i];
          } else {
            str += ' ' + date[i];
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
          s.color = '';
          s.value = date1[i][j];
          date2.push(s);
        }
        date3.push(date2);
      }
    }

    return <div>{loading ? <Spin /> : <ShowMessage {...this.props} date={date3} />}</div>;
  }
}

function mapStateToProps(state) {
  const { Message, Mename } = state.mid;
  const { session } = state.header
  return {
    loading: state.loading.models.mid,
    Message,
    Mename,
    session
  };
}

export default connect(mapStateToProps)(Detail);
