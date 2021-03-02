// I added { useState } so hook could be used (sololearn)
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import marked from "marked"; //Be sure to download this... would save a lot of confusion...

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true,
});

// Starting the code for Markdown Previewer
function MarkDownApp(props) {
  // Set state for markdown.
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  // Handle any change that happens to the editor with this function.
  function handleEditorChange(obj) {
    setMarkdown(obj.target.value);
  }

  function clearEditor() {
    setMarkdown("");
  }

  return (
    <div>
      <h1 id="header">React Markdown Previewer for FCC</h1>
      <Editor
        markdown={markdown}
        onChange={handleEditorChange}
        onClick={clearEditor}
      />
      <Previewer markdown={markdown} onClick={clearEditor} />;
    </div>
  );
}

// starting project
function Editor(props) {
  return (
    <div id="editor-container">
      <h3 className="headers" id="editor-header">
        Editor{" "}
        <span onClick={props.onClick} class="btn btn-danger">
          {/*Used bootstrap to set up button quickly without much thinking thus we need the class. */}
          Clear
        </span>
      </h3>

      <textarea
        id="editor"
        type="text"
        onChange={props.onChange}
        value={props.markdown}
      >
        {/*onChange must equal {props.onChange} not {props.handleEditorChange} as we are not calling the handleEditorChange 
        function rather we are setting onChange to the prop. Then in the function component we call the hook 
        <Editor markdown={markdown} onChange={handleEditorChange} />. Showing that when editor is called it goes
        to props.onChange meaning onChange is taken to handleEditorChange.  */}
      </textarea>
    </div>
  );
}

//Next create Previewer.
function Previewer(props) {
  return (
    <div id="previewer-container">
      <h3 className="headers" id="previewer-header">
        Previewer{" "}
        <span onClick={props.onClick} class="btn btn-danger">
          Clear
        </span>
      </h3>

      <div
        id="previewer"
        dangerouslySetInnerHTML={{
          __html: marked(props.markdown),
        }}
      >
        {/*After importing marked simply use it to wrap around state (markdown) to 
      output the html version of it all. We use dangerouslySetInnerHTML instead of innerHTML
      with react*/}
      </div>
    </div>
  );
}
//Set this as the initial state by putting it into a variable and putting variable in useState.
let defaultMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
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
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)


*Hunter Lacefield*  
*[A link to Linkedin Profile](https://www.linkedin.com/in/hunter-lacefield-871995115/)*`;

ReactDOM.render(<MarkDownApp />, document.getElementById("app"));
