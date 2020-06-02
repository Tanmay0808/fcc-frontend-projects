import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      breakLength:5,
      sessionLength:25,
      minutes:25,
      seconds:0,
      intervalID:'',
      timerType:'Session',
      running:false
    }

    this.incrementLength = this.incrementLength.bind(this);
    this.decrementLength = this.decrementLength.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.controlSwitch = this.controlSwitch.bind(this);
    this.timerControl = this.timerControl.bind(this);
  }

  incrementLength(type)
  {
    switch(type)
    {
      case 'BREAK-LENGTH':{
        const {breakLength:len,running:active} = this.state;
        if (len < 60 && !active)
        {
          this.setState({
            breakLength:len + 1
          });
        }
        break;
      }
      case 'SESSION-LENGTH':{
        const {sessionLength:len,running:active} = this.state;
        if (len < 60 && !active)
        {
          this.setState({
            sessionLength:len + 1,
            minutes:this.state.minutes + 1
          });
        }
        break;
      }
      default:
      break;
    }
  }

  decrementLength(type)
  {
    switch(type)
    {
      case 'BREAK-LENGTH':{
        const {breakLength:len,running:active} = this.state;
        if (len > 1 && !active)
        {
          this.setState({
            breakLength:len - 1
          });
        }
        break;
      }
      case 'SESSION-LENGTH':{
        const {sessionLength:len,running:active} = this.state;
        if (len > 1 && !active)
        {
          this.setState({
            sessionLength:len - 1,
            minutes:this.state.minutes - 1,
          });
        }
        break;
      }
      default:
      break;
    }
  }

  timerControl()
  {
    let control = this.state.running == false ? (
      this.startTimer(),
      this.setState({running:true})
    ) : (
      this.setState({running:false}),
      this.state.intervalID && clearInterval(this.state.intervalID)
    );
  }

  controlSwitch()
  {
    if (this.state.timerType == 'Session') {
      this.state.intervalID && clearInterval(this.state.intervalID);
      this.setState({
        timerType:'Break Time',
        minutes:this.state.breakLength,
        seconds:0,
        running:false
      });
      this.startTimer();
    }else{
      this.state.intervalID && clearInterval(this.state.intervalID);
      this.setState({
        timerType:'Session',
        minutes:this.state.sessionLength,
        seconds:0,
        running:false
      });
      this.startTimer();
    }
  }
    
  startTimer(){
    this.setState({
      intervalID: setInterval(() => {
        const { minutes , seconds } = this.state;
        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1,
          }));
        }
        if (seconds === 0) {
          if (minutes === 0) {
            this.audioBeep.play();
            this.controlSwitch();
          } else {
            this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59
            }));
          }
        }
      }, 1000)
    });
  }

  resetTimer()
  {
    this.setState({
      breakLength:5,
      sessionLength:25,
      minutes:25,
      seconds:0,
      timerType:'Session',
      running:false
    });
    this.state.intervalID && clearInterval(this.state.intervalID);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  render()
  {
    return (
      <>
        <div id="title">Pomodoro Clock</div>
        <div id="body">
          <BreakLength len = {this.state.breakLength} increment = {this.incrementLength} decrement = {this.decrementLength} />
          <SessionLength len = {this.state.sessionLength} increment = {this.incrementLength} decrement = {this.decrementLength} />
          <Timer time = {[this.state.minutes,this.state.seconds]} disp = {this.state.timerType} start_stop = {this.timerControl} reset = {this.resetTimer} />
          <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={(audio) => { this.audioBeep = audio; }} />
        </div>
      </>
    );
  }
}

const BreakLength = (props)=>{
  return (
    <div id="break">
      <div id="break-label">Break Length</div>
      <div className="components">
        <div id="break-decrement" onClick={()=>props.decrement("BREAK-LENGTH")}><i className="fa fa-arrow-circle-down"></i></div>
        <div id="break-length">{props.len}</div>
        <div id="break-increment"onClick={()=>props.increment("BREAK-LENGTH")}><i className="fa fa-arrow-circle-up"></i></div>
      </div>
    </div>
  );
}

const SessionLength = (props)=>{
  return (
    <div id="session">
      <div id="session-label">Session Length</div>
      <div className="components">
        <div id="session-decrement" onClick={()=>props.decrement("SESSION-LENGTH")}><i className="fa fa-arrow-circle-down"></i></div>
        <div id="session-length">{props.len}</div>
        <div id="session-increment" onClick={()=>props.increment("SESSION-LENGTH")}><i className="fa fa-arrow-circle-up"></i></div>
      </div>
    </div>
  );
}

const Timer = (props)=>{
  return (
    <div id="timer">
      <div id="timer-label">{props.disp}</div>
      <div id="time-left">{props.time[0] < 10 ? `0${props.time[0]}`:props.time[0]}:{props.time[1]<10 ? `0${props.time[1]}`:props.time[1]}</div>
      <div className="components">
        <div id="start_stop" onClick={()=>props.start_stop()}><i className="fa fa-play"></i><i className="fa fa-pause"></i></div>
        <div id="reset" onClick={()=>props.reset()}><i className="fa fa-refresh"></i></div>
      </div>
    </div>
  );
}

export default App;
