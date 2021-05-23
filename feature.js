const featNames = [
    "Pen", "Eraser", "Color grid", "Large pen", "Undo", "Redo", "Clear all", "Color picker", "Straight line", "Circle", //0-9
    "Oval", "Rectangle", "Calligraphy pen", "Change background color", "Set background image", "Opacity", "Rake", "Color wheel", "Rock stamp", "Grass stamp", //10-19
    "Square eraser", "Soft brush", "Rotate left", "Rotate right", "Bomb", "Small pen", "Swirl", "Double-pronged rake", "Save your image", "Horizontal line", //20-29
    "Vertical line", "Stick figure stamp", "Blend", "Sparkles", "Vertical flip", "Horizontal flip", "Change background image to a suggestion", "Dust", "Interference", "Lamp", //30-39
    "Blossom stamp", "Door stamp", "Background gradient", "Rainbow pen", "Draw your own brush", "Erase & blend rectangle", "Recycling stamp", "Hair stamp", "Turn off all features", "Highlighter", //40-49
    "Lightning", "Heart stamp", "Ice crack", "X-shaped brush", "Mouse pointer stamp", "Grid", "Checkers stamp", "Arrows", "Cloud stamp", "Star stamp", //50-59
    "Very large brush", ":D stamp", "wheee stamp", "Sun stamp" //60-63
];

const featSets = [
    //3.1
    [0],
    //3.2
    [0, 1],
    //2.2
    [0, 1],
    //2.4
    [3, 1, 4, 0],
    //1.4
    [2, 3, 1, 0],
    //1.8
    [7, 11, 10, 0, 2, 9, 1, 3],
    //0.8
    [0, 1, 8, 2, 3, 6, 10, 11],
    //0.16
    [4, 1, 2, 10, 21, 0, 16, 7, 6, 3, 8, 13, 5, 15, 22, 11],
    //1.16
    [13, 19, 0, 8, 2, 3, 4, 5, 6, 7, 10, 14, 1, 22, 12, 17],
    //1.32
    [26, 21, 15, 9, 23, 39, 4, 46, 24, 7, 29, 32, 0, 11, 14, 38, 35, 1, 5, 47, 22, 3, 2, 37, 33, 12, 13, 6, 34, 8, 10, 44],
    //2.32
    [24, 34, 7, 3, 45, 12, 31, 2, 9, 30, 39, 37, 15, 1, 21, 36, 38, 11, 23, 33, 20, 16, 41, 14, 0, 22, 5, 6, 10, 13, 8, 4],
    //2.64
    [26, 30, 0, 46, 21, 25, 51, 35, 34, 16, 33, 32, 8, 1, 59, 4, 11, 3, 52, 15, 55, 24, 40, 57, 19, 7, 18, 36, 44, 13, 48, 29, 10, 9, 37, 27, 6, 49, 31, 5, 12, 58, 63, 22, 38, 45, 20, 43, 42, 54, 14, 41, 61, 23, 56, 2, 17, 39, 53, 60, 47, 62, 50, 28],
    //3.64
    [29, 32, 7, 33, 27, 3, 16, 54, 0, 56, 51, 31, 10, 20, 25, 37, 13, 41, 48, 18, 34, 9, 40, 44, 6, 4, 1, 17, 43, 57, 61, 28, 21, 5, 12, 46, 23, 59, 50, 35, 2, 15, 19, 53, 60, 49, 45, 30, 58, 39, 42, 8, 11, 63, 26, 24, 36, 22, 55, 52, 38, 47, 62, 14],
    //3.128
    [5, 46, 44, 32, 58, 39, 27, 9, 12, 49, 41, 45, 8, 13, 23, 31, 10, 29, 14, 0, 47, 49, 18, 9, 22, 50, 28, 36, 21, 60, 51, 40, 57, 11, 53, 36, 55, 32, 20, 7, 29, 16, 8, 1, 25, 57, 28, 25, 0, 33, 17, 35, 27, 54, 13, 37, 61, 18, 5, 46, 7, 12, 1, 53, 58, 21, 19, 34, 2, 38, 15, 44, 56, 61, 4, 11, 41, 6, 19, 42, 4, 42, 60, 45, 43, 3, 62, 30, 43, 33, 22, 39, 56, 10, 6, 52, 14, 20, 3, 26, 48, 23, 63, 55, 24, 37, 62, 51, 15, 59, 52, 24, 31, 47, 34, 35, 2, 17, 48, 26, 40, 63, 59, 54, 38, 50, 16, 30]
];

var featWindow = null; // The element corresponding to an open feature window

const featFuncs = [
    //Pen
    () => {
        penType = "pen";
        penWidth = 3;
    },
    //Eraser
    () => {
        penType = "eraser";
        penWidth = 20;
    },
    //Color grid
    () => {
        if (featWindow) { featWindow.remove(); featWindow = null; return; }

        featWindow = document.createElement("div");
        featWindow.className = "feat-window";
        featWindow.id = "feat2";
        featWindow.innerHTML = "<div>Choose a color:</div><img id=\"feat2-img\"></img><canvas id=\"feat2-canvas\"></canvas><div style=\"font-size:10px\">Image: Google</div>";
        document.getElementById("test").appendChild(featWindow);

        var featImg = document.getElementById("feat2-img");
        var featCanvas = document.getElementById("feat2-canvas");
        featImg.onload = () => {
            featCanvas.width = featImg.width;
            featCanvas.height = featImg.height;
            featCanvas.getContext('2d').drawImage(featImg, 0, 0);
            featImg.hidden = true;
        }
        featImg.src = "imgs/colors.png";
        featCanvas.onclick = (ev) => {
            var imageData = featCanvas.getContext('2d').getImageData(ev.offsetX, ev.offsetY, 1, 1);
            penColor.r = imageData.data[0];
            penColor.g = imageData.data[1];
            penColor.b = imageData.data[2];
            penColor.rainbow = null;
        }
    },
    //Large pen
    () => {
        penType = "pen";
        penWidth = 10;
    },
    //Undo
    () => {
        if (currentHistIndex > 0) {
            currentHistIndex--;
            var saved = new Image();
            saved.onload = function () { canvasArea.clearBack(); canvasArea.backContext.drawImage(saved, 0, 0); }
            saved.src = canvasHist[currentHistIndex];
        }
    },
    //Redo
    () => {
        if (currentHistIndex < canvasHist.length-1) {
            currentHistIndex++;
            var saved = new Image();
            saved.onload = function () { canvasArea.clearBack(); canvasArea.backContext.drawImage(saved, 0, 0); }
            saved.src = canvasHist[currentHistIndex];
        }
    },
    //Clear all
    () => {
        canvasArea.clearBack();
        recordBackCanvas();
    },
    //Color picker
    () => {
        penType = "colorPicker";
    },
    //Straight line
    () => {
        penType = "straight";
    },
    //Circle
    () => {
        penType = "circle";
    },
    //Oval
    () => {
        penType = "oval";
    },
    //Rectangle
    () => {
        penType = "rect";
    },
    //Calligraphy pen
    () => {
        penType = "calligraphy";
    },
    //Change background color
    () => {
        canvasArea.backCanvas.style.backgroundColor = getPenColor();
    },
    //Set background image
    () => {
        if (featWindow) { featWindow.remove(); featWindow = null; return; }

        var backImage = document.getElementById("canvas-img");
        featWindow = document.createElement("div");
        featWindow.className = "feat-window";
        featWindow.id = "feat14";
        featWindow.innerHTML = "<div>Link to image:</div><input type=\"text\" value=\"" + (backImage.src || "") + "\">";
        featWindow.onchange = () => {
            try {
                backImage.src = featWindow.lastElementChild.value;
                canvasArea.backCanvas.style.backgroundColor = (featWindow.lastElementChild.value == "") ? "" : "transparent";
            } catch (e) {
                backImage.src = "";
                canvasArea.backCanvas.style.backgroundColor = "";
            }
        };
        document.getElementById("test").appendChild(featWindow);
    },
    //Opacity
    () => {
        if (featWindow) { featWindow.remove(); featWindow = null; return; }

        featWindow = document.createElement("div");
        featWindow.className = "feat-window";
        featWindow.id = "feat15";
        featWindow.innerHTML = "<div>Opacity:</div><input type=\"range\" min=\"0\" max=\"100\" value=\"" + penColor.a*100 + "\">";
        featWindow.onchange = () => {
            penColor.a = featWindow.lastElementChild.value/100;
            canvasArea.canvas.style.opacity = penColor.a;
        };
        document.getElementById("test").appendChild(featWindow);
    },
    //Rake
    () => {
        penType = "rake";
    },
    //Color wheel
    () => {
        if (featWindow) { featWindow.remove(); featWindow = null; return; }

        featWindow = document.createElement("div");
        featWindow.className = "feat-window";
        featWindow.id = "feat17";
        featWindow.innerHTML = "<div>Choose a color:</div><input type=\"color\" value=\"" + getHex() + "\">";
        featWindow.onchange = () => {
            var val = featWindow.lastElementChild.value;
            penColor.r = parseInt(val.substring(1, 3), 16);
            penColor.g = parseInt(val.substring(3, 5), 16);
            penColor.b = parseInt(val.substring(5, 7), 16);
            penColor.rainbow = null;
        };
        document.getElementById("test").appendChild(featWindow);
    },
    //Rock stamp
    () => {
        penType = "rock";
    },
    //Grass stamp
    () => {
        penType = "grass";
    },
    //Square eraser
    () => {
        penType = "squareEraser";
    },
    //Soft brush
    () => {
        penType = "soft";
    },
    //Rotate left
    () => {
        transform.rotate -= 30;
        applyTransform();
    },
    //Rotate right
    () => {
        transform.rotate += 30;
        applyTransform();
    },
    //Bomb
    () => {},
    //Small pen
    () => {
        penType = "pen";
        penWidth = 1;
    },
    //Swirl
    () => {},
    //Double-pronged rake
    () => {
        penType = "rake2";
    },
    //Save your image
    () => {}, //nothing lol
    //Horizontal line
    () => {
        penType = "horizontal";
    },
    //Vertical line
    () => {
        penType = "vertical";
    },
    //Stick figure stamp
    () => {
        penType = "stickFig";
    },
    //Blend
    () => {
        penType = "blend";
    },
    //Sparkles
    () => {
        penType = "sparkle";
    },
    //Vertical mirror
    () => {
        transform.scaleY *= -1;
        applyTransform();
    },
    //Horizontal mirror
    () => {
        transform.scaleX *= -1;
        applyTransform();
    },
    //Change background image to a suggestion
    (roundNum, first) => {
        var backImage = document.getElementById("canvas-img");
        if (!backImage.src || backImage.src == "" || backImage.src == window.location.href) {
            canvasArea.backCanvas.style.backgroundColor = "transparent";
            backImage.src = imageLinks[Math.abs(roundNum-3)*2 + !first];
        }
        else {
            backImage.src = window.location.href;
            canvasArea.backCanvas.style.backgroundColor = "";
        }
    },
    //Dust
    () => {
        penType = "dust";
    },
    //Interference
    () => {
        var ctx = canvasArea.backContext;
        for(var x = 0; x < canvasArea.backCanvas.width; x += 5) {
            for(var y = 0; y < canvasArea.backCanvas.height; y += 5) {
                if (Math.random() > 0.9) {
                    var imgData = ctx.createImageData(5, 5);
                    imgData.data[0] = 255*Math.random();
                    imgData.data[1] = 255*Math.random();
                    imgData.data[2] = 255*Math.random();
                    imgData.data[3] = 255;
                    for (var i = 4; i < imgData.data.length; i += 4) {
                        imgData.data[i+0] = imgData.data[0];
                        imgData.data[i+1] = imgData.data[1];
                        imgData.data[i+2] = imgData.data[1];
                        imgData.data[i+3] = 255;
                    }
                    ctx.putImageData(imgData, x, y);
                }
            }
        }
        recordBackCanvas();
    },
    //Lamp
    () => {},
    //Blossom stamp
    () => {
        penType = "blossom";
    },
    //Door stamp
    () => {
        penType = "door";
    },
    //Background gradient
    () => {
        var prior = canvasArea.backCanvas.style.backgroundColor;
        canvasArea.backCanvas.style.backgroundColor = "transparent";
        window.setTimeout(() => {
            canvasArea.backCanvas.style.backgroundImage = "linear-gradient(transparent, " + getPenColor() + ")";
            canvasArea.backCanvas.style.backgroundColor = prior;
        }, 1);
    },
    //Rainbow pen
    () => {
        penColor.rainbow = 0;
    },
    //Draw your own brush
    () => {},
    //Erase & blend rectangle
    () => {},
    //Recycling stamp
    () => {
        penType = "recycle";
    },
    //Hair stamp
    () => {
        penType = "hair";
    },
    //Turn off all features
    () => {
        penType = null;
        penWidth = 3;
        penColor = {r: 0, g: 0, b: 0, a: 1, rainbow: null};
        canvasHist = [];
        canvasHist[0] = canvasArea.backCanvas.toDataURL();
        currentHistIndex = 0;
        transform.rotate = 0;
        applyTransform();
    },
    //Highlighter
    () => {
        penType = "highlighter";
        penColor.a = 0.38;
        canvasArea.canvas.style.opacity = penColor.a;
    },
    //Lightning
    () => {},
    //Heart stamp
    () => {
        penType = "hearts";
    },
    //Ice crack
    () => {},
    //X-shaped brush
    () => {
        penType = "x";
    },
    //Mouse pointer stamp
    () => {
        penType = "mouse";
    },
    //Grid
    () => {
        var spacing = penWidth*10;
        var ctx = canvasArea.backContext;
        ctx.save();
        ctx.strokeStyle = getFlatPenColor();
        ctx.lineWidth = penWidth;
        console.log(canvasArea.backCanvas);
        for(var x = spacing; x < canvasArea.backCanvas.width; x += spacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasArea.backCanvas.height);
            ctx.stroke();
        }
        for(var y = spacing; y < canvasArea.backCanvas.height; y += spacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasArea.backCanvas.width, y);
            ctx.stroke();
        }
        ctx.restore();
        recordBackCanvas();
    },
    //Checkers stamp
    () => {
        penType = "checkers";
    },
    //Arrows
    () => {
        penType = "arrow";
    },
    //Cloud stamp
    () => {
        penType = "cloud";
    },
    //Star stamp
    () => {
        penType = "star";
    },
    //Very large brush
    () => {
        penType = "pen";
        penWidth = 20;
    },
    //:D stamp
    () => {
        penType = ":D";
    },
    //wheee stamp
    () => {
        penType = "wheee";
    },
    //Sun stamp
    () => {
        penType = "sun";
    }
];

const keywords = [
    "major", "marriage", "traffic jam", "insurance", "volcano", "coach", "disaster", "conditions"
];

const imageLinks = [
    //major
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4W9n-ocdfYP8Xxvt_e3ZDbW4DogFUNsNMEw&usqp=CAU",
    //marriage
    "https://cdn.wedding-spot.com/__sized__/images/venues/15377/Iberostar-Rose-Hall-Beach-Montego-Bay-Jamaica-118aca4b-d20a-41d3-bcb4-cdfb1ed28a43-97450e389c42885476f1fbe9bc5bca5a.jpg",
    //traffic jam
    "https://media.fugro.com/media/images/default-source/services/highways.jpg?sfvrsn=79a53b1a_19",
    //insurance
    "https://www.ecocladding.com/sites/default/files/Kinsale%20Insurance3.jpg",
    //volcano
    "https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg",
    //coach
    "https://pbs.twimg.com/media/EiDhRVPWsAESyvJ.jpg",
    //disaster
    "https://www.centreforcities.org/wp-content/uploads/2018/11/UK_town_x1650-1630x845.jpg",
    //conditions
    "https://www.rev.com/blog/wp-content/uploads/2020/03/How-to-Add-Captions-Subtitles-to-Blackboard-Online-Courses.jpg"
];