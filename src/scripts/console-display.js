// original
const logBackup = console.log;
let logMessages = [];

console.log = function () {
    logMessages.push.apply(logMessages, arguments);
    logBackup.apply(console, arguments);
    constructConsoleOutput();
};

console.clear = function () {
    logMessages = [];
    constructConsoleOutput();
}

// Container element for console output
const consoleContentElem = document.getElementsByClassName("console-content")[0];

function constructConsoleOutput() {
    consoleContentElem.innerHTML = '';
    const listElem = document.createElement("ul");
    // clear console output at first.
    for (const message of logMessages) {
        const liElem = document.createElement("li");
        liElem.textContent = message;
        listElem.appendChild(liElem);
    }
    consoleContentElem.appendChild(listElem);
}

console.log("This is my first sentence!");
