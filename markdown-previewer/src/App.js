import React from 'react';
import './App.css'
import marked from 'marked';

//Options for marked
marked.setOptions({
  breaks: true,
});

//Initial text for editor
const placeholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...\n
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

class App extends React.Component{
  constructor()
  {
    super();
    this.state = {
      content:placeholder
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event)
  {
    this.setState({
      content: event.target.value
    });
  }

  componentDidMount()
  {
    let flg = false;
    document.querySelector('.editor').querySelector('button').addEventListener('click',()=>{toggleStyle()});

    function toggleStyle()
    {
        if (!flg){
          document.querySelector("#head-editor").style.width = '90vw';
          document.querySelector("#editor").style.height = '70vh';
          document.querySelector("#editor").style.width = '90vw';
          document.querySelector('#resizer').classList=  'fa fa-compress';
          flg = !flg;
        }else{
          document.querySelector("#head-editor").style.width = '70vw';
          document.querySelector("#editor").style.height = 'initial';
          document.querySelector("#editor").style.width = '70vw';
          document.querySelector('#resizer').classList=  'fa fa-expand';
          flg = !flg;
        }
    }
  }
  
  render()
  {
    return (
      <>
        <div className="editor">
          <div className="head" id="head-editor"><i class="fa fa-edit"></i> Editor<button style={{background:'transparent'}}><i id='resizer' className="fa fa-expand"></i></button></div>
          <textarea id="editor" value={this.state.content} onChange={this.handleChange}></textarea>
        </div>
        <div className="previewer">
          <div className="head" id="head-previewer">Previewer</div>
          <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.content)}} disabled></div>
        </div>
      </>
    );
  }
}

export default App;
