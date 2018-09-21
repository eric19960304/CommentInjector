import React from 'react';
import { addComments } from '../utils';
import './File.css';


class File extends React.Component {
    constructor(props) {
        super(props);

        /*
            this.props.file format:
            { meta: { name, size }, reader},
        */

        this.state = {
            source_code: null,
        }

        this.export = this.export.bind(this);
        this.addComments = this.addComments.bind(this);
    }

    render() {
        var file = this.props.file;

        return (
            <div>
                <hr/>
                <div className="round-border">
                    {file.meta.name}
                </div>
                { !this.state.source_code?
                    <button onClick={this.addComments}>Inject quotes!</button>
                    :
                    <div style={{display: "inline-block"}}>
                        <button onClick={this.export}>Download result</button>
                    </div>
                }
                
                <hr/>
            </div>
        );
    }

    addComments(){
        const {file, comment_list} = this.props;


        if (!file || !file.text) {
            return;
        }

        const extension = file.meta.name.split('.').pop();
        var source_code = addComments(file.text, extension, comment_list);

        this.setState({
            source_code,
        });
    }


    export() {
        let export_file = this.state.source_code;
        var element = document.createElement("a");
        var file = new Blob([export_file], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = 'done_' + this.props.file.meta.name;
        element.click();
    }

}

export default File;