import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      inpuExp:'',
      outputVal:'0',
      prev_value:''
    };

    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
  }

  handleButton(key)
  {
    if (!((key === '0' && (/^0/).test(this.state.outputVal)) || (key === '.' && (this.state.outputVal.indexOf(key)!==-1))))
    {
       this.setState({
         inpuExp:this.state.inpuExp === 'DIGIT LIMIT EXCEEDED' ? key : this.state.inpuExp + key,  
         outputVal:(['+','-','*','/','0'].indexOf(this.state.outputVal)!==-1) ?  key : this.state.outputVal + key,  
         prev_value:key
        });
    }

    if(this.state.outputVal.length > 22)
    {
      this.maxDigitWarning();
    }
  }
  
  handleOperator(val)
  {
    if (this.state.inpuExp==='')
    {
      this.setState({
        inpuExp:'0' + val,
        outputVal:val,
        prev_value:val
      })
    }else if (this.state.inpuExp.indexOf("=") !== -1){
      this.setState({
        inpuExp:this.state.outputVal + val,
        outputVal:val,
        prev_value:val
      });
    }
    else if (val!==this.state.prev_value){
      this.setState({
        inpuExp:this.state.inpuExp + val,
        outputVal:val,
        prev_value:val
      });
    }
  }

  calculateResult()
  {
    const endsWithOperator = /[x+‑/]$/;
    //Regex arrays for correction of certain invalid expressions
    const arr1=[/(\+)(0)/g,/(\*)(0)/g,/(\/)(0)/g,/(-)(0)/g];
    const arr2 = [/(\+|-|\/|\*)(\+|-|\/|\*)(\+)/g,/(\+|-|\/|\*)(\+|-|\/|\*)(\/)/g,/(\+|-|\/|\*)(\+|-|\/|\*)(-)/g,/(\+|-|\/|\*)(\+|-|\/|\*)(\*)/g];
    
    try{
      if (!this.state.inpuExp.includes("LIMIT")) {
        let expression = this.state.inpuExp;
        if (expression.indexOf("=") === -1){
          
          while (endsWithOperator.test(expression)) {
            expression = expression.slice(0, -1);
          }

          for (let i=0;i<arr1.length;i++)
          {
            expression = expression.replace(arr1[i],'$1');
            expression = expression.replace(arr2[i],'$3');
          }
          
          expression = expression.replace(/‑/g, "-");
          
          let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
          
          this.setState({
            inpuExp:
            expression.replace(/-/g, "-") + "=" + answer,
            outputVal:answer.toString(),
          });
        }
      }
    }
    catch{
      let prev_exp = this.state.inpuExp;
      let prev_out = this.state.outputVal;
      
      this.setState({
        inpuExp:'INVALID EXPRESSION',
        outputVal:''
      });
      
      setTimeout(()=>{
        this.setState({
          inpuExp:prev_exp,
          outputVal:prev_out
        })
      },1000);
    }
  }

  clearDisplay()
  {
    this.setState({
      inpuExp:'',
      outputVal:'0',
      prev_value:''
    })
  }

  maxDigitWarning()
  {
    const inp = this.state.inpuExp;
    const out = this.state.outputVal;
    const pre = this.state.prev_value;
    
    this.setState({
      inpuExp:'DIGIT LIMIT EXCEEDED',
      outputVal:'',
      prev_value:''
    });
    
    setTimeout(() => {
      this.setState({
        inpuExp:inp,
        outputVal:out,
        prev_value:pre
      }); 
    }, 1000);
  }

  render()
  {
    return (
      <>
        <Display exp={this.state.inpuExp} res={this.state.outputVal} />
        <TopButtons buttonPress = {this.handleButton} clearButton = {this.clearDisplay} operatorPress = {this.handleOperator} />
        <div id="numericpad">
          <NumericPad buttonPress = {this.handleButton} />
          <RightButtons buttonPress = {this.handleButton} equals = {this.calculateResult} operatorPress = {this.handleOperator} />
        </div>
      </>
    );
  }
}

const Display = (props)=>{
  return (
    <div id="displayScreen">
      <div className="display">{props.exp}</div>
      <div className="display" id="display">{props.res}</div>
    </div>
  );
}

const TopButtons = (props)=>{
  return (
    <div id="top">
      <div id="clear" onClick={()=>props.clearButton()}>AC</div>
      <div id="divide" onClick={()=>props.operatorPress('/')}>/</div>
      <div id="multiply" onClick={()=>props.operatorPress('*')}>x</div>
    </div>
  );
}

const RightButtons = (props)=>{
  return (
    <div id="right">
      <div id="add" onClick={()=>props.operatorPress('+')}>+</div>
      <div id="subtract" onClick={()=>props.operatorPress('-')}>-</div>
      <div id="equals" onClick={()=>props.equals()}>=</div>
    </div>
  );
}

const NumericPad = (props)=>{
  return (
    <div id="digits">
      <div id="one" onClick={()=>props.buttonPress('1')}>1</div>
      <div id="two" onClick={()=>props.buttonPress('2')}>2</div>
      <div id="three" onClick={()=>props.buttonPress('3')}>3</div>
      <div id="four" onClick={()=>props.buttonPress('4')}>4</div>
      <div id="five" onClick={()=>props.buttonPress('5')}>5</div>
      <div id="six" onClick={()=>props.buttonPress('6')}>6</div>
      <div id="seven" onClick={()=>props.buttonPress('7')}>7</div>
      <div id="eight" onClick={()=>props.buttonPress('8')}>8</div>
      <div id="nine" onClick={()=>props.buttonPress('9')}>9</div>
      <div id="zero" onClick={()=>props.buttonPress('0')}>0</div>
      <div id="decimal" onClick={()=>props.buttonPress('.')}>.</div>
    </div>
  );
}

export default App;
