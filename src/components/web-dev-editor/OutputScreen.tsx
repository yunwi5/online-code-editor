import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";

interface Props {
    srcDoc: string;
    consoleDoc: string;
}

const OutputScreen: React.FC<Props> = (props) => {
    const { srcDoc, consoleDoc } = props;
    const [htmlOpen, setHtmlOpen] = useState(true);
    const [consoleOpen, setConsoleOpen] = useState(true);

    return (
        <div className="pane bottom-pane">
            <div className={`html-screen output-screen ${htmlOpen ? "" : "collapsed"}`}>
                <div className="editor-title">
                    HTML Page
                    <button
                        onClick={() => setHtmlOpen((prevOpen) => !prevOpen)}
                        type="button"
                        className="expand-collapse-btn"
                    >
                        <FontAwesomeIcon icon={htmlOpen ? faCompressAlt : faExpandAlt} />
                    </button>
                </div>
                <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
            <div className={`console-screen output-screen ${consoleOpen ? "" : "collapsed"}`}>
                <div className="editor-title">
                    Console Output
                    <button
                        onClick={() => setConsoleOpen((prevOpen) => !prevOpen)}
                        type="button"
                        className="expand-collapse-btn"
                    >
                        <FontAwesomeIcon icon={consoleOpen ? faCompressAlt : faExpandAlt} />
                    </button>
                </div>
                <iframe
                    srcDoc={consoleDoc}
                    title="Console"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default OutputScreen;
