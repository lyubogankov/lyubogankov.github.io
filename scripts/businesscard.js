const output = document.getElementById("output").firstChild;
const input = document.getElementById("input");
const runbutton = document.getElementById("play-btn");

// https://pyodide.org/en/stable/usage/quickstart.html#alternative-example

output.textContent = "initializing...\n";

// initialize pyodide

function replaceOutput(contents) { 
    output.textContent = contents;
}
function appendToOutput(contents) { 
    output.textContent += `${contents}\n`;
}

async function main() {
    let pyodide = await loadPyodide({stdout: appendToOutput, stderr: appendToOutput});
    output.textContent = "ready!\n";
    return pyodide;
}
let pyodideReadyPromise = main();

async function evaluatePython() {
    let pyodide = await pyodideReadyPromise;
    try {
        // await pyodide.loadPackagesFromImports(input.value, appendToOutput, appendToOutput);
        // clear the screen
        output.textContent = "";
        // don't need to output this, just want the "print" statement to run!
        let returnval = pyodide.runPython(input.textContent);
    } catch (err) {
        output.textContent = err;
    }
    output.textContent = output.textContent.replace('\n\n', '\n');
}

// Create event listener for the play button
runbutton.addEventListener("click", () => { evaluatePython(); } );