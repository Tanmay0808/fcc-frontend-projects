import React from 'react';
import './App.css';
import {bankOne,bankTwo} from './audioTracks.js';

const keys = ['Q','W','E','A','S','D','Z','X','C'];
var selectedBank;

class App extends React.Component{
  constructor()
  {
    super();
    this.state = {
      power:false,
      bank:false,
      input:"Lets go"
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playAudioTrack = this.playAudioTrack.bind(this);
  }

  playAudioTrack(val)
  {
    const currObj = selectedBank.filter((track)=>{
      if (track['keyTrigger'] === val)
        return track;
    });
    const sound = document.getElementById(val);
    sound.setAttribute('src',currObj[0].url);
    sound.currentTime = 0;
    sound.play();

    this.setState({
      input:currObj[0].id,
      });
  }

  handleKeyPress(val)
  {
    if (this.state.power)
    {
      //If key pressed from onscreen buttons
      if (keys.indexOf(val)!==-1){
        this.playAudioTrack(val);
      }
      else{
        //If key pressed from keyboard
        val = String.fromCharCode(val.keyCode); 
        if (keys.indexOf(val)!==-1){
          this.playAudioTrack(val);
        }
      }
    }
  }

  componentDidMount()
  {
    document.querySelector("#power").addEventListener('click',()=>{
      this.setState({
        power:!this.state.power,
        input:'Lets Go'
      })
    });
    document.querySelector("#bank").addEventListener('click',()=>{
      this.setState({
        bank:!this.state.bank
      });
    });

    document.addEventListener('keydown',this.handleKeyPress);
  }
  
  render()
  {
    selectedBank = this.state.bank ? bankTwo : bankOne;
    return (
      <>
        <div id="header">The Drum Machine</div>
        <div id="drum-machine">
        <div id="mains">
          <div>
            <label>Power</label><button id="power">{this.state.power ? "ON" : "OFF"}</button>
          </div>
          <div>
            <label>Bank</label><button id="bank">{this.state.bank ? "ON" : "OFF"}</button>
          </div>
        </div> 
        <div id="display">{this.state.power ? this.state.input : "Power Off"}</div>
          <div id="drum-beats">
            <a href="#" className="drum-pad" id={selectedBank[0].id} onClick={()=>this.handleKeyPress("Q")}>Q<audio src={selectedBank[0].url} className="clip" id="Q" preload="auto"></audio></a>
            <a href="#" className="drum-pad" id={selectedBank[1].id} onClick={()=>this.handleKeyPress("W")}>W<audio src={selectedBank[1].url} className="clip" id="W" preload="auto"></audio></a>
            <a href="#" className="drum-pad" id={selectedBank[2].id} onClick={()=>this.handleKeyPress("E")}>E<audio src={selectedBank[2].url} className="clip" id="E" preload="auto"></audio></a>
            <a href="#" className="drum-pad" id={selectedBank[3].id} onClick={()=>this.handleKeyPress("A")}>A<audio src={selectedBank[3].url} className="clip" id="A" preload="auto"></audio></a>
            <a href="#" className="drum-pad" id={selectedBank[4].id} onClick={()=>this.handleKeyPress("S")}>S<audio src={selectedBank[4].url} className="clip" id="S" preload="auto"></audio></a>
            <a href="#" className="drum-pad" id={selectedBank[5].id} onClick={()=>this.handleKeyPress("D")}>D<audio src={selectedBank[5].url} className="clip" id="D" preload="auto"></audio></a>
            <a href="#" className="drum-pad" id={selectedBank[6].id} onClick={()=>this.handleKeyPress("Z")}>Z<audio src={selectedBank[6].url} className="clip" id="Z" preload="auto"></audio></a>
            <a href="#" className="drum-pad" id={selectedBank[7].id} onClick={()=>this.handleKeyPress("X")}>X<audio src={selectedBank[7].url} className="clip" id="X" preload="auto"></audio></a>
            <a href="#" className="drum-pad" id={selectedBank[8].id} onClick={()=>this.handleKeyPress("C")}>C<audio src={selectedBank[8].url} className="clip" id="C" preload="auto"></audio></a>
          </div> 
        </div>
      </>
    );
  }
}

export default App;
