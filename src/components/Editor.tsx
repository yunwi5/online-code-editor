import React, { useState } from "react";
// CodeMirror boilerplate
import CodeMirror from "codemirror";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";

// Language support like Python, Go etc
import "codemirror/mode/xml/xml"; // html
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";

// User hinting
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/javascript-hint";

// User typing helper
import "codemirror/addon/lint/lint";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";

interface Props {
    displayName: string;
    language: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: React.FC<Props> = (props) => {
    const { displayName, language, value, onChange } = props;
    const [open, setOpen] = useState(true);

    const handleChange = (
        editor: CodeMirror.Editor,
        data: CodeMirror.EditorChange,
        value: string,
    ) => {
        editor.showHint({ completeSingle: false });
        onChange(value);
    };

    return (
        <div className={`editor-container ${open ? "" : "collapsed"}`}>
            <div className='editor-title'>
                {displayName}{" "}
                <button
                    onClick={() => setOpen((prevOpen) => !prevOpen)}
                    type='button'
                    className='expand-collapse-btn'
                >
                    <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
                </button>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className='code-mirror-wrapper'
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    lineNumbers: true,
                    extraKeys: { "Ctrl-Space": "autocomplete" },
                    theme: "material",
                    autoCloseBrackets: true,
                    autoCloseTags: true,
                    autoRefresh: true,
                    smartIndent: true,
                }}
            />
        </div>
    );
};

export default Editor;
