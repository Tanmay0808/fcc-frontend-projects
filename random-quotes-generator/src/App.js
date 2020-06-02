import React from 'react';
import './App.css';
import {data} from './data.js';

//Set of pre-defined colors for background
var colorInd,colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

class App extends React.Component{
  constructor()
  {
    super();
    this.state = {
      quote:'',
      author:'',
    }
    this.fetchQuote = this.fetchQuote.bind(this);
  }

  fetchQuote(){
    colorInd = Math.floor(Math.random()*12);
    let ind = Math.floor(Math.random()*data.length);
    
    this.setState({
      quote:data[ind]['quote'],
      author:data[ind]['author']
    });
    
    //Url to tweet the current quote
    let tweetURL = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + data[ind]['quote'] + '" \n - ' + data[ind]['author']);
    
    document.querySelector('#main').style.backgroundColor = colors[colorInd];
    document.querySelector('#quote-box').style.color = colors[colorInd];
    
    let tweet = document.querySelector('#tweet-quote');
    tweet.style.backgroundColor = colors[colorInd];
    tweet.setAttribute('href',tweetURL);
  }

  componentDidMount()
  {
    this.fetchQuote();
  }

  render(){
  return (
    <div id="main">
      <div id="quote-box">
        <div id="text"><i class="fa fa-quote-left"></i>{this.state.quote}</div>
        <div id="author"> - {this.state.author}</div>
        <div id="buttons">
        <a target="_blank" id="tweet-quote"><i className="fa fa-twitter fa-2x"></i></a>
        <button style={{borderRadius:'5px',backgroundColor:colors[colorInd],color:'white'}} id="new-quote" onClick={()=>this.fetchQuote()}>New Quote</button>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
