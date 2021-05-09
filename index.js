const spreadsheetScript = "https://script.google.com/macros/s/AKfycbz0EsksQ_32naV01ooQzQ6xQ5_mzVUeaOE5FogEloqzZ7A5ZJOX/exec";

var featureType;
var times = [];
var clicks = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];
var startTime;
var lastChoice = 0;

function init() {
    if (document.body.clientWidth < 800 || document.body.clientHeight < 600) document.getElementById("mobile").style.visibility = "visible";
    else document.getElementById("welcome").style.visibility = "visible";

    canvasArea.start();
}

function offlineInit(type) {
    canvasArea.start();
    featureType = type;
    doRound(3);
}

function startTests() {
    document.getElementById("welcome-start").disabled = true;
    httpGetAsync(spreadsheetScript, (val) => {
        featureType = parseInt(val) % 2;
        document.getElementById("welcome").style.visibility = "hidden";
        doRound(3);
    });
}

function doRound(roundNum) {
    document.getElementById("choice").style.visibility = "hidden";
    document.getElementById("test").style.visibility = "visible";

    doTest(roundNum, true);
}

function doTest(roundNum, first) {
    var featSet = featSets[2*roundNum + !first];
    var sidebar = document.getElementById("sidebar");
    for(var i = sidebar.children.length-1; i >= 0; i--) sidebar.children.item(i).remove();
    for(var i = 0; i < featSet.length; i++) {
        clicks[2*roundNum + !first].push(0);
        var e = document.createElement("button");
        e.classList = "feature feature" + featureType;
        e.setAttribute("title", featNames[featSet[i]]);
        e.style.backgroundImage = "URL(\"icons/feature" + featSet[i] + ".png\")";
        const j = i;
        e.onclick = (ev) => {
            if (featWindow && featWindow.id != "feat"+featSet[j]) {
                featWindow.remove();
                featWindow = null;
            }
            featFuncs[featSet[j]](ev);
            clicks[2*roundNum + !first][featSet[j]]++;
        };
        sidebar.appendChild(e);
    }

    document.getElementById("test-word").innerText = "\"" + keywords[Math.abs(roundNum-3)*2 + !first] + "\"";
    document.getElementById("test-done").onclick = () => {
        times[2*roundNum + !first] = (Date.now() - startTime)/1000;
        canvasArea.clear(); //TODO: save image
        if (first) doTest(roundNum, false);
        else compare(roundNum);
    };

    startTime = Date.now();
}

function compare(roundNum) {
    document.getElementById("test").style.visibility = "hidden";
    document.getElementById("choice").style.visibility = "visible";
    document.getElementById("choice-button-1").onclick = () => { choose(roundNum, true); };
    document.getElementById("choice-button-2").onclick = () => { choose(roundNum, false); };
}

function choose(lastRound, chooseSmaller) {
    var choice = chooseSmaller ? Math.pow(2, lastRound) : Math.pow(2, lastRound+1);
    if (choice == lastChoice || choice == 1 || choice == 128) {
        lastChoice = choice;
        showSubmit();
        return;
    }

    lastChoice = choice;
    if (chooseSmaller) {
        doRound(lastRound-1);
    } else {
        doRound(lastRound+1);
    }
}

function showSubmit() {
    document.getElementById("choice").style.visibility = "hidden";
    document.getElementById("submit").style.visibility = "visible";
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