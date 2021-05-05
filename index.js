var times = [];
var startTime;

function init() {
    if (document.body.clientWidth < 800 || document.body.clientHeight < 600) document.getElementById("mobile").style.visibility = "visible";
    else document.getElementById("welcome").style.visibility = "visible";
}

function doTest(round, lastChoice) {
    if (!lastChoice) document.getElementById("welcome").style.visibility = "hidden";
    else document.getElementById("choice").style.visibility = "hidden";

    document.getElementById("test").style.visibility = "visible";

    startTime = Date.now();

    console.log("test");
    httpGetAsync("https://script.google.com/macros/s/AKfycbz0EsksQ_32naV01ooQzQ6xQ5_mzVUeaOE5FogEloqzZ7A5ZJOX/exec", (val) => {
        console.log(val);
    });
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