const output = document.getElementById("output");
const input = document.getElementById("input");

// https://pyodide.org/en/stable/usage/quickstart.html#alternative-example

output.value = "initializing console output...\n";

// initialize pyodide
function replaceOutput(contents) { 
    output.value = contents;
    output.scrollTop = output.scrollHeight;
}
function appendToOutput(contents) { 
    output.value += `${contents}\n`;
    output.scrollTop = output.scrollHeight;
}

async function main() {
    let pyodide = await loadPyodide({stdout: appendToOutput, stderr: appendToOutput});
    output.value = "console output ready!\n";
    return pyodide;
}
let pyodideReadyPromise = main();

async function evaluatePython() {
    let pyodide = await pyodideReadyPromise;
    try {
        // await pyodide.loadPackagesFromImports(input.value, appendToOutput, appendToOutput);
        // clear the screen
        output.value = "";
        // don't need to output this, just want the "print" statement to run!
        let returnval = pyodide.runPython(input.textContent);
    } catch (err) {
        output.value = err;
    }
}