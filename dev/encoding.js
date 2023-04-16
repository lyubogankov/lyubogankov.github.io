
// from LeaderLine docs [https://anseki.github.io/leader-line/]
// > When you will do something about HTML document [...], you typically do that after the HTML document is ready
// > (i.e. the HTML document has been loaded and parsed by web browser).
// > If you don't wait for HTML document to be ready, you might not be able to get a target element yet, or problems with incomplete layout may occur.
// > Also, you should do so asynchronous like the above for the performance because synchronous code blocks parsing HTML.
window.addEventListener('load', function() { // NOT `DOMContentLoaded`
    let textarea = document.getElementById('raw-text');
    let oneline = document.getElementById('raw-text-singlestring');
    let oneline_take2 = document.getElementById('raw-text-singlestring-2');

    let onelinestring = JSON.stringify(textarea.textContent).replaceAll("\"", "");;

    oneline.textContent = onelinestring;

    // additional processing:
    let lastchar = "";
    let output_str = "";
    for (var i=0; i < onelinestring.length; i++) {
        // console.log(onelinestring.charAt(i));
        let currentchar = onelinestring.charAt(i);
        if (currentchar == '\\' && lastchar == '\\')
            continue;
        output_str += currentchar;
        lastchar = currentchar;
    }
    oneline_take2.textContent = output_str;

    // character run-length encoding
    let runlens = [];
    let currentchar = onelinestring.charAt(0);
    let currentcount = 1;
    for (var i=1; i < onelinestring.length; i++) {
        let nextchar = onelinestring.charAt(i);
        if (nextchar == currentchar) {
            currentcount++;
            continue;
        }
        runlens.push([currentchar, currentcount]);
        currentchar = nextchar;
        currentcount = 1;
    }
    let runlendiv = document.getElementById("run-lens");
    runlendiv.textContent = JSON.stringify(runlens);

});