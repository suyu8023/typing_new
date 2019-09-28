import React from "react";
// import axios from "axios";
import CSS from "./mid.css";
import { List } from 'react-virtualized';

function handleClick(e) {
  e.preventDefault();
}

class List1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.list,
      maxlen: 0
    };
  }

  input = null;

  barkTwice = () => {
    // console.log(this.input)
    if (this.input == null) {
      console.log("++++++")
    }
    this.input.focus();
  };

  oninput = e => {
    console.log(document.getElementById("qw").scrollTop)
    document.getElementById("read10").scrollTop = 20
    let i = parseInt(e.target.id.slice(4));
    let value = e.target.value;
    let j = parseInt(e.target.value.length);
    let max = Math.max(j, this.state.maxlen);
    this.setState({
      maxlen: max
    })
    if (
      j > 0 && j < this.state.value.length + 1 &&
      value[j - 1] !== this.state.value[j - 1].value
    ) {
      let date = this.state.value;
      date[j - 1].color = "red";
      this.setState({
        value: date
      });
    } else if (
      j > 0 && j < this.state.value.length + 1 &&
      value[j - 1] === this.state.value[j - 1].value
    ) {
      let date = this.state.value;
      date[j - 1].color = "green";
      this.setState({
        date: date
      });
    }
    if (j < max) {
      let date = this.state.value;
      date[j].color = "black";
      this.setState({
        value: date
      });
    }
    if (j === this.state.value.length + 1 && value[j - 1] === " ") {
      const nextIndex = i + 1;
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
              <span key={item.index} style={{ color: item.color }}>
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
      activeIndex: 0
    };
  }

  list = [];

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
    return (
      <div id='qw' style={{height: 500, overflow: 'hidden'}}>
        {date.map((item, index) => {
          return (
            <List1
              key={index}
              id={"qaq" + item.mid}
              list={item}
              index={index}
              in={input}
              activeIndex={this.state.activeIndex}
              bark={this.bark}
              ref={ref => (this.list[index] = ref)}
            />
          );
        })}
      </div>
      // <List
      //   width={300}
      //   height={300}
      //   rowCount={this.props.date.length}
      //   rowHeight={20}
      //   rowRenderer={List1}
      //   >

      // </List>
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

  componentDidMount() {
    let mid = this.props.match.params.mid;

    // axios.get("/api/message/" + mid).then(
    //   response => {
    let date = `Scars To Your Beautiful - Alessia Cara
        She just wants to be beautiful
        She goes unnoticed she knows no limits
        She craves attention she praises an image
        She prays to be sculpted by the sculptor
        Oh she don't see the light that's shining
        Deeper than the eyes can find it
        Maybe we have made her blind
        So she tries to cover up her pain and cut her woes away
        Cause covergirls don't cry after their face is made
        But there's a hope that's waiting for you in the dark
        You should know you're beautiful just the way you are
        And you don't have to change a thing
        The world could change its heart
        No scars to your beautiful we're stars and we're beautiful
        Oh
        And you don't have to change a thing
        The world could change its heart
        No scars to your beautiful we're stars and we're beautiful
        She has dreams to be an envy so she's starving
        You know covergirls eat nothing
        She says beauty is pain and there's beauty in everything
        What's a little bit of hunger
        I could go a little while longer she fades away
        She don't see her perfect she don't understand she's worth it
        Or that beauty goes deeper than the surface
        So to all the girls that's hurting
        Let me be your mirror help you see a little bit clearer
        The light that shines within
        There's a hope that's waiting for you in the dark
        You should know you're beautiful just the way you are
        And you don't have to change a thing
        The world could change its heart
        No scars to your beautiful we're stars and we're beautiful
        And you don't have to change a thing
        The world could change its heart
        No scars to your beautiful we're stars and we're beautiful
        No better you than the you that you are
        No better you than the you that you are
        No better life than the life we're living
        No better life than the life we're living
        No better time for your shine you're a star
        No better time for your shine you're a star
        Oh you're beautiful oh you're beautiful
        There's a hope that's waiting for you in the dark
        You should know you're beautiful just the way you are
        And you don't have to change a thing
        The world could change its heart
        No scars to your beautiful we're stars and we're beautiful
        And you don't have to change a thing
        The world could change its heart
        No scars to your beautiful we're stars and we're beautiful`;
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

    let date3 = [];
    let xx = 0;
    for (let i = 0; i < date1.length; i++) {
      let date2 = [];
      for (let j = 0; j < date1[i].length; j++) {
        let s = {};
        s.index = xx++;
        s.color = "black";
        s.value = date1[i][j];
        date2.push(s);
      }
      date3.push(date2);
    }
    this.setState(
      {
        date1: date3
      },
      () => {
      }
    );
  }

  render() {
    return (
      <div>
        <ShowMessage
          date={this.state.date1}
        />
      </div>
    );
  }
}

export default Detail;