import React, { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from 'antd';

function EditorOrigin() {
    const htmlRef = useRef(null);
    const cssRef = useRef(null);
    const jsRef = useRef(null);
    const jsonRef = useRef(null);
    const previewRef = useRef(null);

    function htmlEditorDidMount(editor, monaco) {
        htmlRef.current = editor;
    }
    function cssEditorDidMount(editor, monaco) {
        cssRef.current = editor;
    }
    function jsEditorDidMount(editor, monaco) {
        jsRef.current = editor;
    }
    function jsonEditorDidMount(editor, monaco) {
        jsonRef.current = editor;
    }
    let jsonTemp = '';
    function addJson(json, temp) {
        console.log(2, json, temp)
        for (let i = 0; i < temp.length; i++) {
            let indexJ = 0;
            if (temp[i] === '$' && temp[i + 1] === '{') {
                console.log('i', i)
                jsonTemp += temp.slice(0, i);
                for (let j = i + 1; j < temp.length; j++) {
                    if (temp[j] === '}') {
                        console.log('j', j)
                        indexJ = j;
                        const jsonStr = temp.slice(i + 2, j);
                        console.log(333, jsonTemp, jsonStr)
                        if (json[jsonStr]) {
                            console.log(444, json[jsonStr])
                            jsonTemp += json[jsonStr];
                            console.log(555, jsonTemp)
                        } else {
                            jsonTemp += "";
                        }
                        break;
                    } 
                    // else {
                    //     if (j === temp.length - 1) {
                    //         jsonTemp += temp.slice(i);
                    //         break;
                    //     }
                    // }
                }
            }
        }
        console.log('res', jsonTemp)
        return jsonTemp;
    }
    function preview() {
        const htmlTemp = htmlRef.current.getValue();
        const cssTemp = cssRef.current.getValue();
        const jsTemp = jsRef.current.getValue();
        const jsonTemp = jsonRef.current.getValue();
        const previewTemp = `<style>/*css*/${cssTemp}/*css*/</style><!--html-->${htmlTemp}<!--html--><img style="display:none;" src="0" onerror="(function(){/*js*/${jsTemp}/*js*/})()"/>`;
        // console.log(1, previewTemp)
        const jsonPreviewTemp = addJson(JSON.parse(jsonTemp), previewTemp)
        // console.log(3, jsonPreviewTemp)
        if (previewTemp && previewRef) {
            const curDocument = previewRef.current.contentDocument;
            curDocument.body.innerHTML = previewTemp;
        }
    }
    return (
        <div style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                    <div>html</div>
                    <Editor
                        height="280px"
                        defaultLanguage="html"
                        onMount={htmlEditorDidMount}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <div>css</div>
                    <Editor
                        height="280px"
                        defaultLanguage="css"
                        onMount={cssEditorDidMount}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <div>js</div>
                    <Editor
                        height="280px"
                        defaultLanguage="javascript"
                        onMount={jsEditorDidMount}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                    <div>json</div>
                    <Editor
                        height="280px"
                        defaultLanguage="json"
                        onMount={jsonEditorDidMount}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <div>预览</div>
                    <iframe width="90%" height="100%" ref={previewRef}>

                    </iframe>
                </div>
            </div>
            <Button style={{ marginTop: "20px" }} type="primary" onClick={preview}>预览</Button>
        </div>
    );
}

export default EditorOrigin;
