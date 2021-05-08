const spreadsheetScript = "https://script.google.com/macros/s/AKfycbz0EsksQ_32naV01ooQzQ6xQ5_mzVUeaOE5FogEloqzZ7A5ZJOX/exec";

var featureType;
var times = [];
var clicks = [];
var startTime;

function init() {
    if (document.body.clientWidth < 800 || document.body.clientHeight < 600) document.getElementById("mobile").style.visibility = "visible";
    else document.getElementById("welcome").style.visibility = "visible";
}

function startTests() {
    document.getElementById("welcome-start").disabled = true;
    httpGetAsync(spreadsheetScript, (val) => {
        featureType = parseInt(val) % 2;
        document.getElementById("welcome").style.visibility = "hidden";
        doRound(3);
    });
}

function doRound(roundNum, lastChoice) {
    document.getElementById("choice").style.visibility = "hidden";
    document.getElementById("test").style.visibility = "visible";

    doTest(roundNum, true);
    //TODO: continue
}

function doTest(roundNum, first) {
    var featSet = featSets[2*roundNum + !first];
    var sidebar = document.getElementById("sidebar");
    sidebar.children.foreach(child => { child.remove(); });
    for(var i = 0; i < featSet.length; i++) {
        var e = document.createElement("button");
        e.classList = "feature feature" + featureType;
        e.setAttribute("title", featNames[featSet[i]]);
        e.onclick = featFuncs[featSet[i]];
        sidebar.appendChild(e);
    }

    document.getElementById("test-word").innerText = "\"" + keywords[Math.abs(roundNum-3)*2 + !first] + "\"";
    // document.getElementById("test-done").onclick = () => { doTest() };

    startTime = Date.now();
}

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}