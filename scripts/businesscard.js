const output = document.getElementById("output")
const code = document.getElementById("input")

function addToOutput(s) {
    output.value += `${s}\n`
    output.scrollTop = output.scrollHeight
}

async function evaluatePython() {
    addToOutput(`>>>${code.value}`)

    try {
        // Since pyodide 0.18.0, you must call loadPackagesFromImports() 
        // to import any python packages referenced via import statements in your code.
        // This function will no longer do it for you.
        await pyodide.loadPackagesFromImports(code.value, addToOutput, addToOutput)
        let result = await pyodide.runPythonAsync(code.value)
    }
    catch (e) {
        addToOutput(`${e}`)
    }
}

(async () => { // enable await 
    output.value = 'Initializing...\n'

    // init Pyodide
    window.pyodide = await loadPyodide({ stdout: addToOutput, stderr: addToOutput }) // redirect stdout and stderr to addToOutput
    output.value += 'Ready!\n'

})(); // execute immediately