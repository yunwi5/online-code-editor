export const ConsoleOutputStyle = `
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html {
        font-family: sans-serif;
        white-space: nowrap;
    }

    body {
        background-color: #f7f7f7;
    }

    .container {
        margin-top: 1rem;
    }

    .console-content {
        padding: .7rem 1rem;
        color: #898fd4;
    }

    .console-content ul {
        display: flex;
        flex-direction: column;
    }

    .console-content li {
        padding: .3rem .3rem;
        list-style: none;
        border-bottom: 1px solid #adb5bd;
        min-width: 8rem;
    }
`;

export const ConsoleOutputScript = `
    const logBackup = console.log;
    let logMessages = [];

    console.log = function () {
        // arguments: {"0":"This is my first sentence!"}
        logMessages.push.apply(logMessages, arguments);
        logBackup.apply(console, arguments);
        constructConsoleOutput();
    };

    console.clear = function () {
        logMessages = [];
        constructConsoleOutput();
    }

    const errorSuffix = '{error}'
    console.error = function (e) {
        const errMessage = e;
        logMessages.push(errMessage + errorSuffix);
        constructConsoleOutput();
    }

    function isError(message) {
        if (!message || typeof message !== 'string') {
            return;
        }
        return message.endsWith('{error}');
    }

    function getErrorMessage(message) {
        if (!message || typeof message !== 'string') {
            return message;
        }
        const suffixIdx = message.indexOf(errorSuffix);
        return message.substring(0, suffixIdx);
    }

    // Container element for console output
    const consoleContentElem = document.getElementsByClassName("console-content")[0];

    function constructConsoleOutput() {
        consoleContentElem.innerHTML = '';
        const listElem = document.createElement("ul");

        // clear console output at first.
        for (let message of logMessages) {
            const liElem = document.createElement("li");
            if (isError(message)) {
                liElem.style.backgroundColor = '#fadde1';
                liElem.style.color = '#ff87ab';
                message = getErrorMessage(message);
            }
            const mType = typeof message;
            liElem.textContent = message;
            listElem.appendChild(liElem);
        }
        consoleContentElem.appendChild(listElem);
    }
    console.log("This is my first sentence!");
`;
