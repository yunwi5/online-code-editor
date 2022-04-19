import React, { useEffect, useState } from "react";

import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { ConsoleOutputScript, ConsoleOutputStyle } from "../utils/console-display";

function App() {
    const [html, setHtml] = useLocalStorage("html", "");
    const [css, setCss] = useLocalStorage("css", "");
    const [js, setJs] = useLocalStorage("javascript", "");

    const [srcDoc, setSrcDoc] = useState("");
    const [consoleDoc, setConsoleDoc] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newSrcDoc = `
                    <html>
                        <body>
                            ${html}
                        </body>
                        <style>${css}</style>
                        <script>${js}</script>
                    </html>
                `;
            setSrcDoc(newSrcDoc);

            const newConsoleScreen = `
                <html>
                    <body>
                        <div style="display: none;">
                            ${html}
                        </div>
                    </body>
                    <div class="console-content"></div>
                    <style>${ConsoleOutputStyle}</style>
                    <script>${ConsoleOutputScript}</script>
                    <script>${js}</script>
                </html>
            `;
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
            <div className="pane">
                <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="console-content">
                <iframe
                    srcDoc={consoleDoc}
                    title="Console"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
        </>
    );
}

export default App;
