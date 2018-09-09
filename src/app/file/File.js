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
            isis_source_code: null,
        }

        this.export = this.export.bind(this);
        this.addComments = this.addComments.bind(this);
    }

    addComments(){
        const {file, isis_phrases_list} = this.props;

        console.log(file);

        if (!file || !file.text) {
            return;
        }

        var isis_source_code = addComments(file.text, isis_phrases_list);

        this.setState({
            isis_source_code,
        });

        console.log(isis_source_code);
    }


    export() {
        let export_file = this.state.isis_source_code;
        var element = document.createElement("a");
        var file = new Blob([export_file], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = 'ISIS_' + this.props.file.meta.name;
        element.click();
    }

    render() {
        var file = this.props.file;

        return (
            <div>
                <hr/>
                <div class="round-border">
                    {file.meta.name}
                </div>
                { !this.state.isis_source_code?
                    <button onClick={this.addComments}>Inject ISIS comments</button>
                    :
                    <div style={{display: "inline-block"}}>
                        <button onClick={this.export}>Download result</button>
                    </div>
                }
                
                <hr/>
            </div>
        );
    }
}

export default File;