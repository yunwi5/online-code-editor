import React from "react";
import { Route, Routes } from "react-router-dom";
import PlConsoleEditor from "./pl-console-editor/PlConsoleEditor";
import WebDevEditor from "./web-dev-editor/WebDevEditor";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<WebDevEditor />} />
            <Route path="/web-dev-editor" element={<WebDevEditor />} />
            <Route path="/console-editor" element={<PlConsoleEditor />} />
        </Routes>
    );
};

export default App;
