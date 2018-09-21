import React from 'react';
import {File} from './file';
import {FilesUpload} from './fileUpload';
import { addComments} from './utils';
import './App.css';

const defaultInput=`#include <iostream>
using namespace std;

void permute(string a, int i, int n) {
   if (i == n) cout << a << endl;

    for (int j = i; j <= n; j++) {
        swap(a[i], a[j]);          
        permute(a, i+1, n);
        swap(a[i], a[j]);
    }
} 

int main() {
   string a = "ABC";
   permute(a, 0, a.length()-1);
   return 0;
}
`;

const defaultExtension = 'cpp';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /*
            files format:
            {
                "meta": ...,
                "text": ...
            }
            */
            files: [],
            comment_list: [],
            input: defaultInput,
            extensions: defaultExtension,
            output: "",
        }

        this.handleFileAdd = this.handleFileAdd.bind(this);
        this.injectComment = this.injectComment.bind(this);
    }

    render() {
        const {files, comment_list, input, extensions, output } = this.state;

        return (
            <div>
                <img src="/images/cover.jpg" style={{width: "800px"}} alt="Shakespeare" />
                <p>
                    This web app allow you to inject Shakespeare's quotes into your 
                    <a href="https://searchmicroservices.techtarget.com/definition/source-code">source code</a> as comments.
                </p>
                <div className={"input-textarea"}>
                    extension:<br/>
                    <textarea rows="1" cols="20" value={extensions} onChange={this.onTextAreaChange('extensions')}></textarea><br/>
                    source code:<br/>
                    <textarea rows="20" cols="60" value={input} onChange={this.onTextAreaChange('input')}></textarea>
                </div>
                <div className={"output-textarea"}>
                    output:<br/>
                    <textarea rows="20" cols="60" value={output} readOnly={true}></textarea>
                </div>
                <button style={{display: "block"}} onClick={this.injectComment}>Inject comment!</button>
                <p>
                    You can also upload file to inject. Supported file extensions: <br/>
                    cpp, c, cc, java, js, cs, scl, tsx, ts, hs, sh, coffee, pl, rb, py. <br/>
                    For unsupported extensions, system will prompt you to specify a comment identifier.
                </p>
                <div style={{width: "100%", display: "block"}}>
                    <FilesUpload files={this.state.files} handleFileAdd={this.handleFileAdd} />
                </div>

                <br/>

                <div style={{width: "100%", display: "block"}}>
                    { files.map( (file, index) => (
                        <File 
                            file={file}
                            key={index}
                            comment_list={comment_list}
                        />
                    ))}
                </div>
                
            </div>
        );
    }

    componentWillMount(){
        var comment_list;
        fetch('comment_list.txt')
            .then(data => data.text())
            .then(text => {
                comment_list = text.split('\n');
                this.setState({
                    comment_list
                });
            })
    }

    handleFileAdd(_file) {
        // will be called when new file is uploaded
        this.setState({
            files: this.state.files.concat(_file)
        });
    }

    injectComment(){
        const { input, extensions, comment_list } = this.state;
        const result = addComments(input, extensions, comment_list);
        this.setState({
            output: result
        }); 
    }

    onTextAreaChange = (name) => (event) =>{
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
}

export default App;