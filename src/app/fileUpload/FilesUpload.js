import React from 'react';
import Dropzone from 'react-dropzone'
import ReactDOM from 'react-dom';
import './FilesUpload.css';

class FilesUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileReaders: [],
            /*
            format:
            [
                { meta: { name, size }, text},
            ]
             */
            msg: 'No file provided.'
        }

        this.onDrop = this.onDrop.bind(this);
        this.submitFiles = this.submitFiles.bind(this);
    }

    render() {
        const { fileReaders } = this.state;
        return (
            <div>
                <Dropzone 
                    className="dropzone"
                    onDrop={this.onDrop.bind(this)}
                >
                    <p style={{padding: "60px 0px 0px 72px"}}>
                        Drop your source code here
                    </p>
                </Dropzone>

                <div className="file-info-area">
                    <button 
                        onClick={this.submitFiles}
                        disabled={fileReaders.length == 0}
                    > 
                        Upload 
                    </button> 
                    <br />
                    <div style={{margin: "10px 20px 10px 20px"}}>
                        <h2>Dropped files:</h2>
                        { fileReaders.length > 0 ?
                            <ul>
                                {fileReaders.map( (fr, index) => 
                                    <li key={index}>
                                        {fr.meta.name} - {fr.meta.size} bytes
                                    </li>
                                )} 
                            </ul>
                            :
                            <span dangerouslySetInnerHTML={{__html: this.state.msg}}></span>
                        }
                    </div>
                </div>
            </div>
        );
    }

    onDrop(_files) {
        const { fileReaders } = this.state;

        const readers = _files.map( (file, index) => {
            const reader = new FileReader();

            // This fires after the blob has been read/loaded.
            reader.addEventListener('loadend', (e) => {
                const text = e.srcElement.result;
                this.props.handleFileAdd({
                    meta: file,
                    text: text
                });

                var _msg = '';
                if(fileReaders){
                    _msg = this.state.msg + file.name + ' is uploaded<br/>';
                }
                this.setState({
                    fileReaders: fileReaders.filter(f => f.name!==file.name),
                    msg: _msg
                });
            });

            return {
                reader: reader,
                meta: file
            };
        });

        this.setState({
            msg: '',
            fileReaders: readers
        });
    }

    submitFiles(){
        if(this.state.fileReaders.length == 0){
            this.setState({
                msg: 'No file provided. <br/>'
            });
            return;
        }

        this.state.fileReaders.map( (fr) =>{
            fr.reader.readAsText(fr.meta);
        });
        
        this.setState({
            msg: 'uploading ... <br/>'
        });
    }
    
}


export default FilesUpload;