import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
        }
    }
    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(newValue, e) {
        console.log('onChange', newValue, e);
    }
    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <MonacoEditor
                language="javascript"
                height={'300px'}
                theme="vs-dark"
                value={code}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
            />
        );
    }
}