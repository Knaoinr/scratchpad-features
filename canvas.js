var isPenDown = false;
var penType = null;

var lastPenX = 0;
var lastPenY = 0;

var penWidth = 3;
var penColor = {r: 0, g: 0, b: 0, a: 1};

var transform = {rotate: 0, scaleX: 1, scaleY: 1};

const sidebarWidth = 200;

var canvasArea = {
    canvas : document.getElementById("canvas"),
    backCanvas : document.getElementById("back-canvas"),
    start : function() {
        //setup canvas
        this.canvas.width = document.body.clientWidth - sidebarWidth;
        this.canvas.height = document.body.clientHeight;
        this.backCanvas.width = this.canvas.width;
        this.backCanvas.height = this.canvas.height;
        this.context = this.canvas.getContext("2d");
        this.backContext = this.backCanvas.getContext("2d");

        //listeners for painting
        this.canvas.addEventListener("mousedown", (ev) => {
            isPenDown = true;

            var ctx = canvasArea.context;
            switch (penType) {
                case "pen":
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(ev.x - sidebarWidth, ev.y, penWidth/2, 0, 2 * Math.PI, true);
                    ctx.fillStyle = getFlatPenColor();
                    ctx.fill();
                    ctx.restore();
                    break;
                case "eraser":
                    ctx = canvasArea.backContext;
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(ev.x - sidebarWidth, ev.y, penWidth/2, 0, 2 * Math.PI, true);
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.fillStyle = "rgba(255,255,255,1)";
                    ctx.fill();
                    ctx.restore();
                    break;
                case "colorPicker":
                    ctx = canvasArea.backContext;
                    var imageData = ctx.getImageData(ev.x - sidebarWidth, ev.y, 1, 1);
                    penColor.r = imageData.data[0];
                    penColor.g = imageData.data[1];
                    penColor.b = imageData.data[2];
                    break;
                case "squareEraser":
                    ctx = canvasArea.backContext;
                    ctx.save();
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.fillStyle = "rgba(255,255,255,1)";
                    var s = penWidth*2;
                    ctx.fillRect(ev.x - sidebarWidth - s/2, ev.y - s/2, s, s);
                    ctx.restore();
                    break;
                case "stickFig":
                    ctx = canvasArea.backContext;
                    var img = new Image();
                    img.onload = () => {
                        ctx.drawImage(img, ev.x - sidebarWidth - img.width/2, ev.y - img.height/2, img.width, img.height);
                    }
                    img.src = "imgs/stickFig.png";
                    break;
                case "recycle":
                    ctx = canvasArea.backContext;
                    var img = new Image();
                    img.onload = () => {
                        ctx.drawImage(img, ev.x - sidebarWidth - img.width/2, ev.y - img.height/2, img.width, img.height);
                    }
                    img.src = "imgs/recycle.png";
                    break;
            }

            lastPenX = ev.x;
            lastPenY = ev.y;
        });
        this.canvas.addEventListener("mouseup", (ev) => {
            isPenDown = false;
            canvasArea.backContext.save();
            canvasArea.backContext.globalAlpha = penColor.a;
            canvasArea.backContext.scale(transform.scaleX, transform.scaleY);
            canvasArea.backContext.drawImage(canvasArea.canvas, 0, 0, this.canvas.width*transform.scaleX, this.canvas.height*transform.scaleY);
            canvasArea.backContext.restore();
            canvasArea.clear();
        });
        this.canvas.addEventListener("mousemove", (ev) => {
            if (isPenDown) {
                var ctx = canvasArea.context;
                switch (penType) {
                    case "pen":
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, ev.y);
                        ctx.strokeStyle = getFlatPenColor();
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        ctx.stroke();
                        ctx.restore();
                        break;
                    case "eraser":
                        ctx = canvasArea.backContext;
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, ev.y);
                        ctx.strokeStyle = "rgba(255,255,255,1)";
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        ctx.stroke();
                        ctx.restore();
                        break;
                    case "straight":
                        canvasArea.clear();
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, ev.y);
                        ctx.strokeStyle = getFlatPenColor();
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        ctx.stroke();
                        ctx.restore();
                        return; //don't update lastPen
                    case "circle":
                        canvasArea.clear();
                        ctx.save();
                        ctx.beginPath();
                        var delta = {x: lastPenX - ev.x, y: lastPenY - ev.y};
                        var rad = Math.sqrt(delta.x*delta.x + delta.y*delta.y)/2;
                        ctx.arc(lastPenX - sidebarWidth - delta.x/2, lastPenY - delta.y/2, rad, 0, 2*Math.PI);
                        ctx.strokeStyle = getFlatPenColor();
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        ctx.stroke();
                        ctx.restore();
                        return; //don't update lastPen
                    case "oval":
                        canvasArea.clear();
                        ctx.save();
                        ctx.beginPath();
                        var delta = {x: lastPenX - ev.x, y: lastPenY - ev.y};
                        ctx.ellipse(lastPenX - sidebarWidth - delta.x/2, lastPenY - delta.y/2, Math.abs(delta.x)/2, Math.abs(delta.y)/2, 0, 0, 2*Math.PI);
                        ctx.strokeStyle = getFlatPenColor();
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        ctx.stroke();
                        ctx.restore();
                        return; //don't update lastPen
                    case "rect":
                        canvasArea.clear();
                        ctx.save();
                        ctx.beginPath();
                        ctx.strokeStyle = getFlatPenColor();
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        var delta = {x: ev.x - lastPenX, y: ev.y - lastPenY};
                        ctx.strokeRect(lastPenX - sidebarWidth, lastPenY, delta.x, delta.y);
                        ctx.restore();
                        return; //don't update lastPen
                    case "horizontal":
                        canvasArea.clear();
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, lastPenY);
                        ctx.strokeStyle = getFlatPenColor();
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        ctx.stroke();
                        ctx.restore();
                        return; //don't update lastPen
                    case "vertical":
                        canvasArea.clear();
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(lastPenX - sidebarWidth, ev.y);
                        ctx.strokeStyle = getFlatPenColor();
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        ctx.stroke();
                        ctx.restore();
                        return; //don't update lastPen
                    case "squareEraser":
                        ctx = canvasArea.backContext;
                        ctx.save();
                        ctx.globalCompositeOperation = "destination-out";
                        ctx.beginPath();
                        var s = penWidth*2;
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, ev.y);
                        ctx.strokeStyle = "rgba(255,255,255,1)";
                        ctx.lineWidth = s;
                        ctx.stroke();
                        ctx.fillStyle = "rgba(255,255,255,1)";
                        ctx.fillRect(ev.x - sidebarWidth - s/2, ev.y - s/2, s, s);
                        ctx.restore();
                        break;
                }

                lastPenX = ev.x;
                lastPenY = ev.y;
            }
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    clearBack : function() {
        this.backContext.clearRect(0, 0, this.backCanvas.width, this.backCanvas.height);
    }
}

function getPenColor() {
    return "rgba(" + penColor.r + "," + penColor.g + "," + penColor.b + "," + penColor.a + ")";
}

function getFlatPenColor() {
    return "rgb(" + penColor.r + "," + penColor.g + "," + penColor.b + ")";
}

function getHex() {
    return "#" + (penColor.r < 16 ? "0" : "") + penColor.r.toString(16) + (penColor.g < 16 ? "0" : "") + penColor.g.toString(16) + (penColor.b < 16 ? "0" : "") + penColor.b.toString(16)
}

function applyTransform() {
    canvasArea.backCanvas.style.transform = "rotate(" + transform.rotate + ") scaleX(" + transform.scaleX + ") scaleY(" + transform.scaleY + ")";
}