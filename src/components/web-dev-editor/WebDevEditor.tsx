import React, { useEffect, useState } from "react";

import Editor from "./Editor";
import useLocalStorage from "../../hooks/useLocalStorage";
import OutputScreen from "./OutputScreen";
import { getConsoleDoc, getSrcDoc } from "../../utils/documents-contruct";

function WebDevEditor() {
    const [html, setHtml] = useLocalStorage("html", "");
    const [css, setCss] = useLocalStorage("css", "");
    const [js, setJs] = useLocalStorage("javascript", "");

    const [srcDoc, setSrcDoc] = useState("");
    const [consoleDoc, setConsoleDoc] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newSrcDoc = getSrcDoc(html, css, js);
            setSrcDoc(newSrcDoc);

            const newConsoleScreen = getConsoleDoc(html, js);
            setConsoleDoc(newConsoleScreen);
        }, 250);
        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <>
            <div className="pane top-pane">
                <Editor displayName="HTML" language="xml" value={html} onChange={setHtml} />
                <Editor displayName="CSS" language="css" value={css} onChange={setCss} />
                <Editor
                    displayName="JavaScript"
                    language="javascript"
                    value={js}
                    onChange={setJs}
                />
            </div>
            {/* Pane should have two sections */}
            <OutputScreen srcDoc={srcDoc} consoleDoc={consoleDoc} />
        </>
    );
}

export default WebDevEditor;
