document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("defaultOpen").click(); // Open HTML tab by default
});

function openTab(evt, tabName) {
    let i, tabcontent, tablinks, textareas;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    textareas = document.querySelectorAll("textarea");
    textareas.forEach(textarea => {
        textarea.classList.remove("active");
    });
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    document.querySelector(`#${tabName.toLowerCase()}-code`).classList.add("active");
}

function run() {
    let htmlCode = document.getElementById("html-code").value;
    let cssCode = document.getElementById("css-code").value;
    let jsCode = document.getElementById("js-code").value;
    let output = document.getElementById("output");

    let documentContent = `${htmlCode}<style>${cssCode}</style>`;
    output.contentDocument.body.innerHTML = documentContent;

    // Safe evaluation of JavaScript code
    try {
        output.contentWindow.eval(jsCode);
    } catch (e) {
        console.error('Error in JavaScript code:', e);
    }

    document.querySelector(".editor").style.display = "none";
    document.getElementById("output-container").style.display = "block";
    document.getElementById("run-btn").style.display = "none";
    document.getElementById("stop-btn").style.display = "inline-block";
}

function stop() {
    document.querySelector(".editor").style.display = "flex";
    document.getElementById("output-container").style.display = "none";
    document.getElementById("run-btn").style.display = "inline-block";
    document.getElementById("stop-btn").style.display = "none";
}
