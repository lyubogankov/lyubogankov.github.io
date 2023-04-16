
// from LeaderLine docs [https://anseki.github.io/leader-line/]
// > When you will do something about HTML document [...], you typically do that after the HTML document is ready
// > (i.e. the HTML document has been loaded and parsed by web browser).
// > If you don't wait for HTML document to be ready, you might not be able to get a target element yet, or problems with incomplete layout may occur.
// > Also, you should do so asynchronous like the above for the performance because synchronous code blocks parsing HTML.


window.addEventListener('load', function() { // NOT `DOMContentLoaded`

    // TAKE ONE
    let textarea = document.getElementById('raw-text');
    let _oneline = document.getElementById('raw-text-singlestring');
    let _oneline_take2 = document.getElementById('raw-text-singlestring-2');

    let _onelinestring = JSON.stringify(textarea.textContent).replaceAll("\"", "");;

    _oneline.textContent = _onelinestring;

    // additional processing:
    let lastchar = "";
    let output_str = "";
    for (var i=0; i < _onelinestring.length; i++) {
        // console.log(_onelinestring.charAt(i));
        let currentchar = _onelinestring.charAt(i);
        if (currentchar == '\\' && lastchar == '\\')
            continue;
        output_str += currentchar;
        lastchar = currentchar;
    }
    _oneline_take2.textContent = output_str;

    // character run-length encoding
    let runlens = [];
    let currentchar = _onelinestring.charAt(0);
    let currentcount = 1;
    for (var i=1; i < _onelinestring.length; i++) {
        let nextchar = _onelinestring.charAt(i);
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


    // TAKE TWO
    let oneline = document.getElementById("text-oneline-annotated");
    let charlen = document.getElementById("text-charlen-annotated");

    let lastChar = "";
    let count = 0;
    let tokennum = 0; // for assigning classes
    for (var i=0; i < textarea.textContent.length; i++) {
        let char = textarea.textContent.charAt(i);
        
        // if it's a repeat, keep counting
        if (char == lastChar) {
            count++;
            continue;
        }
        // otherwise, log to the two representations

        // oneline: push `count` # of `char`, each in a code block
        // charlen: push one (char (w/in code block), count)
        const span_charlen = document.createElement("span");
        span_charlen.innerHTML = `(<code>${char}</code>, ${count})`;
        charlen.appendChild(span_charlen);
        // *** wrap both within a span that shares the same class

        // reset
        lastChar = char;
        count = 0;
        tokennum++;

        
        if (char == '\n')
            console.log("newline");
        else if (char == " ")
            console.log("space");
        else
            console.log(char);
    }

});