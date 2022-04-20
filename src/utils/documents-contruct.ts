import { ConsoleOutputScript, ConsoleOutputStyle } from "./console-display";

export function getSrcDoc(html: string, css: string, js: string) {
    const newSrcDoc = `
                    <html>
                        <body>
                            ${html}
                        </body>
                        <style>${css}</style>
                        <script>${js}</script>
                    </html>
                `;
    return newSrcDoc;
}

export function getConsoleDoc(html: string, js: string) {
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
    return newConsoleScreen;
}
