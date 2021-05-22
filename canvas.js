var isPenDown = false;
var penType = null;

var lastPenX = 0;
var lastPenY = 0;
var lastRake = null;

var penWidth = 3;
var penColor = {r: 0, g: 0, b: 0, a: 1, rainbow: null};

var transform = {rotate: 0, scaleX: 1, scaleY: 1};

var canvasHist = [];
var currentHistIndex = 0;

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
        canvasHist[0] = this.backCanvas.toDataURL();

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
                case "soft":
                    ctx.save();
                    ctx.filter = "blur(" + Math.ceil(Math.log(penWidth)/2+1) + "px)";
                    ctx.beginPath();
                    ctx.arc(ev.x - sidebarWidth, ev.y, penWidth/2, 0, 2 * Math.PI, true);
                    ctx.fillStyle = getFlatPenColor();
                    ctx.fill();
                    ctx.restore();
                    break;
                case "stickFig":
                    drawStamp(ev, "imgs/stickfig.png");
                    break;
                case "recycle":
                    drawStamp(ev, "imgs/recycle.png");
                    break;
                case "hearts":
                    drawStamp(ev, "imgs/hearts.png");
                    break;
                case "rock":
                    drawStamp(ev, "imgs/rock.png");
                    break;
                case "grass":
                    drawStamp(ev, "imgs/grass.png");
                    break;
                case "door":
                    if (Math.random() > 0.5) drawStamp(ev, "imgs/door0.png");
                    else drawStamp(ev, "imgs/door1.png");
                    break;
                case "hair":
                    drawStamp(ev, "imgs/hair" + Math.floor(Math.random()*4) + ".png");
                    break;
                case "mouse":
                    drawStamp(ev, "imgs/mouse.png");
                    break;
                case ":D":
                    drawStamp(ev, "imgs/smile.png");
                    break;
                case "sun":
                    drawStamp(ev, "imgs/sun.png");
                    break;
                case "wheee":
                    drawStamp(ev, "imgs/wheee.png");
                    break;
                case "star":
                    drawStamp(ev, "imgs/star.png");
                    break;
                case "cloud":
                    drawStamp(ev, "imgs/cloud.png");
                    break;
                case "dust":
                    drawStamp(ev, "imgs/dust.png");
                    break;
                case "sparkle":
                    drawStamp(ev, "imgs/sparkle.png");
                    break;
                case "calligraphy":
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(ev.x - sidebarWidth - penWidth/2, ev.y + penWidth);
                    ctx.lineTo(ev.x - sidebarWidth + penWidth/2, ev.y - penWidth);
                    ctx.strokeStyle = getFlatPenColor();
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.restore();
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

            recordBackCanvas();

            lastRake = null;
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
                        ctx.globalCompositeOperation = "destination-out";
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
                    case "calligraphy":
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth - penWidth/2, lastPenY + penWidth);
                        ctx.lineTo(ev.x - sidebarWidth - penWidth/2, ev.y + penWidth);
                        ctx.lineTo(ev.x - sidebarWidth + penWidth/2, ev.y - penWidth);
                        ctx.lineTo(lastPenX - sidebarWidth + penWidth/2, lastPenY - penWidth);
                        ctx.closePath();
                        ctx.fillStyle = getFlatPenColor();
                        ctx.fill();
                        ctx.restore();
                        break;
                    case "rake":
                    case "rake2":
                        ctx.save();
                        ctx.strokeStyle = getFlatPenColor();
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, ev.y);
                        var slope = -1*(ev.x - lastPenX)/(ev.y - lastPenY);
                        var offset = {x: (ev.y > lastPenY ? -1 : 1)*5*Math.sqrt(penWidth*penWidth/(1 + slope*slope)), y: (ev.x > lastPenX ? -1 : 1)*5*Math.sqrt(penWidth*penWidth/(1 + 1/(slope*slope)))};
                        if (!offset.y) {
                            if (slope == 0) offset.y = (ev.x > lastPenX ? -1 : 1)*5;
                        }
                        if (lastRake) {
                            ctx.moveTo(lastRake.leftX, lastRake.leftY);
                            ctx.lineTo(lastPenX - sidebarWidth - offset.x, lastPenY + offset.y);
                            ctx.moveTo(lastRake.rightX, lastRake.rightY);
                            ctx.lineTo(lastPenX - sidebarWidth + offset.x, lastPenY - offset.y);

                            //double
                            if (penType == "rake2") {
                                ctx.moveTo(lastRake.leftX2, lastRake.leftY2);
                                ctx.lineTo(lastPenX - sidebarWidth - offset.x/2, lastPenY + offset.y/2);
                                ctx.moveTo(lastRake.rightX2, lastRake.rightY2);
                                ctx.lineTo(lastPenX - sidebarWidth + offset.x/2, lastPenY - offset.y/2);
                            }
                        }
                        ctx.moveTo(lastPenX - sidebarWidth - offset.x, lastPenY + offset.y);
                        ctx.lineTo(ev.x - sidebarWidth - offset.x, ev.y + offset.y);
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, ev.y);
                        ctx.moveTo(lastPenX - sidebarWidth + offset.x, lastPenY - offset.y);
                        ctx.lineTo(ev.x - sidebarWidth + offset.x, ev.y - offset.y);

                        //double
                        if (penType == "rake2") {
                            ctx.moveTo(lastPenX - sidebarWidth - offset.x/2, lastPenY + offset.y/2);
                            ctx.lineTo(ev.x - sidebarWidth - offset.x/2, ev.y + offset.y/2);
                            ctx.moveTo(lastPenX - sidebarWidth + offset.x/2, lastPenY - offset.y/2);
                            ctx.lineTo(ev.x - sidebarWidth + offset.x/2, ev.y - offset.y/2);
                        }

                        ctx.stroke();
                        ctx.restore();
                        lastRake = {leftX: ev.x - sidebarWidth - offset.x, leftY: ev.y + offset.y, rightX: ev.x - sidebarWidth + offset.x, rightY: ev.y - offset.y};
                        if (penType == "rake2") {
                            lastRake.leftX2 = ev.x - sidebarWidth - offset.x/2;
                            lastRake.rightX2 = ev.x - sidebarWidth + offset.x/2;
                            lastRake.leftY2 = ev.y + offset.y/2;
                            lastRake.rightY2 = ev.y - offset.y/2;
                        }
                        break;
                    case "arrow":
                        canvasArea.clear();
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, ev.y);
                        ctx.strokeStyle = getFlatPenColor();
                        ctx.lineWidth = penWidth;
                        ctx.stroke();

                        //erase the end
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(ev.x - sidebarWidth, ev.y, penWidth, 0, 2 * Math.PI, true);
                        ctx.globalCompositeOperation = "destination-out";
                        ctx.fillStyle = "rgba(255,255,255,1)";
                        ctx.fill();
                        ctx.restore();

                        var alpha = Math.atan((ev.y - lastPenY)/(ev.x - lastPenX)) - Math.PI/4;
                        var one = 5*penWidth*Math.sin(alpha) * ((ev.x >= lastPenX) ? 1 : -1);
                        var two = 5*penWidth*Math.cos(alpha) * ((ev.x >= lastPenX) ? 1 : -1);

                        ctx.fillStyle = ctx.strokeStyle;
                        ctx.beginPath();
                        ctx.moveTo(ev.x - sidebarWidth, ev.y);
                        ctx.lineTo(ev.x - sidebarWidth + one, ev.y - two);
                        ctx.lineTo(ev.x - sidebarWidth - two, ev.y - one);
                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                        return; //don't update lastPen
                    case "soft":
                        ctx.save();
                        ctx.filter = "blur(" + Math.ceil(Math.log(penWidth)/2+1) + "px)";
                        if (penWidth < 5) {
                            ctx.beginPath();
                            ctx.arc(ev.x - sidebarWidth, ev.y, penWidth/2, 0, 2 * Math.PI, true);
                            ctx.fillStyle = getFlatPenColor();
                            ctx.fill();
                        } else {
                            ctx.lineCap = "round";
                        }
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, ev.y);
                        ctx.strokeStyle = getFlatPenColor();
                        ctx.lineWidth = penWidth*2;
                        ctx.stroke();
                        ctx.restore();
                        break;
                    case "blend":
                        ctx.save();
                        ctx.filter = "blur(" + penWidth/2 + "px)";
                        ctx.drawImage(canvasArea.backCanvas, ev.x - sidebarWidth, ev.y, penWidth*2, penWidth*2, ev.x - sidebarWidth, ev.y, penWidth*2, penWidth*2);
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
    rainbow();
    return "rgba(" + penColor.r + "," + penColor.g + "," + penColor.b + "," + penColor.a + ")";
}

function getFlatPenColor() {
    rainbow();
    return "rgb(" + penColor.r + "," + penColor.g + "," + penColor.b + ")";
}

function rainbow() {
    if (penColor.rainbow !== null) {
        penColor.rainbow += 0.1;
        penColor.r = Math.round(128*(Math.sin(penColor.rainbow)+1));
        penColor.g = Math.round(128*(Math.sin(penColor.rainbow + 2*Math.PI/3)+1));
        penColor.b = Math.round(128*(Math.sin(penColor.rainbow + 4*Math.PI/3)+1));
    }
}

function getHex() {
    return "#" + (penColor.r < 16 ? "0" : "") + penColor.r.toString(16) + (penColor.g < 16 ? "0" : "") + penColor.g.toString(16) + (penColor.b < 16 ? "0" : "") + penColor.b.toString(16)
}

function applyTransform() {
    canvasArea.backCanvas.style.transform = "rotate(" + transform.rotate + ") scaleX(" + transform.scaleX + ") scaleY(" + transform.scaleY + ")";
}

function recordBackCanvas() {
    if (currentHistIndex > 30) { canvasHist.splice(0, 1); currentHistIndex--; }
    currentHistIndex++;
    try {
        canvasHist[currentHistIndex] = canvasArea.backCanvas.toDataURL();
    } catch (e) {
        currentHistIndex--;
    }
}

function drawStamp(ev, url) {
    ctx = canvasArea.backContext;
    var img = new Image();
    img.onload = () => {
        ctx.drawImage(img, ev.x - sidebarWidth - img.width/2, ev.y - img.height/2, img.width, img.height);
    }
    img.src = url;
}