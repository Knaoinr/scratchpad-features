// var isPenOn = false;

// var lastPenX = 0;
// var lastPenY = 0;

// var penWidth = 3;
// var penColor = "#000000";

// var clickForColorButton;
// var clickForSizeButton;
// var sizeButton;

// function setupCanvas() {
//     clickForColorButton = document.getElementById("clickForColor");
//     clickForSizeButton = document.getElementById("clickForSize");
//     sizeButton = document.getElementById("sizeButton");

//     var spacing = "&nbsp;&nbsp;&nbsp;";
//     if (penWidth > 99) {
//         spacing = "&nbsp;";
//     } else if (penWidth > 9) {
//         spacing = "&nbsp;&nbsp;";
//     }
//     sizeButton.innerHTML = "&LeftAngleBracket;" + spacing + "" + penWidth + "" + spacing + "&RightAngleBracket;";

//     // Generate color & size buttons
//     var colorDiv = document.getElementById("colors");
//     colorPalette.forEach((color, index) => {
//         var elem = document.createElement("button");
//         elem.id = color;
//         elem.classList.add("color");
//         elem.style.backgroundColor = color;
//         elem.onclick = function() { chooseColor(color) };
//         elem.style.left = (25*index) + "px";
//         if (index == 0) {
//             penColor = color;
//             elem.style.outline = "2px solid lightblue";
//         }
//         colorDiv.appendChild(elem);
//     });

//     canvasArea.start();
// }

// var canvasArea = {
//     canvas : document.getElementById("canvas"),
//     start : function() {
//         //setup canvas
//         this.canvas.width = screen.width;
//         this.canvas.height = screen.height;
//         this.context = this.canvas.getContext("2d");

//         this.canvas.addEventListener("mousedown", (ev) => {
//             isPenOn = true;

//             var ctx = canvasArea.context;
//             ctx.beginPath();
//             ctx.arc(ev.x, ev.y, penWidth/2, 0, 2 * Math.PI, true);
//             ctx.fillStyle = penColor;
//             ctx.fill();

//             lastPenX = ev.x;
//             lastPenY = ev.y;
//         });
//         this.canvas.addEventListener("mouseup", (ev) => {
//             isPenOn = false;
//         });
//         this.canvas.addEventListener("mousemove", (ev) => {
//             if (isPenOn) {
//                 var ctx = canvasArea.context;
//                 ctx.beginPath();
//                 ctx.moveTo(lastPenX, lastPenY);
//                 ctx.lineTo(ev.x, ev.y);
//                 ctx.strokeStyle = penColor;
//                 ctx.lineCap = "round";
//                 ctx.lineWidth = penWidth;
//                 ctx.stroke();
//                 lastPenX = ev.x;
//                 lastPenY = ev.y;
//             }
//         });
//         sizeButton.addEventListener("click", (ev) => {
//             if (ev.x > sizeButton.offsetLeft + (sizeButton.offsetWidth/2)) {
//                 penWidth++;
//             } else {
//                 penWidth--;
//             }
//             if (penWidth < 1) {
//                 penWidth = 1;
//             }
            
//             var spacing = "&nbsp;&nbsp;&nbsp;";
//             if (penWidth > 99) {
//                 spacing = "&nbsp;";
//             } else if (penWidth > 9) {
//                 spacing = "&nbsp;&nbsp;";
//             }
//             sizeButton.innerHTML = "&LeftAngleBracket;" + spacing + "" + penWidth + "" + spacing + "&RightAngleBracket;";
//         });
//     },
//     clear : function() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     }
// }

// function toggleClickForColorSize() {
//     clickForColorButton.hidden = !(clickForColorButton.hidden && clickForSizeButton.hidden);
//     clickForSizeButton.hidden = clickForColorButton.hidden;
//     if (!document.getElementById("colors").hidden) {
//         toggleColor();
//     }
//     if (!sizeButton.hidden) {
//         toggleSize();
//     }
// }

// function toggleColor() {
//     document.getElementById("colors").hidden = !document.getElementById("colors").hidden;
// }

// function toggleSize() {
//     sizeButton.hidden = !sizeButton.hidden;
//     document.getElementById("jumpToButton").hidden = sizeButton.hidden;
//     document.getElementById("sizes").hidden = sizeButton.hidden;
// }

// function jumpToSize(size) {
//     penWidth = size;

//     var spacing = "&nbsp;&nbsp;&nbsp;";
//     if (penWidth > 99) {
//         spacing = "&nbsp;";
//     } else if (penWidth > 9) {
//         spacing = "&nbsp;&nbsp;";
//     }
//     sizeButton.innerHTML = "&LeftAngleBracket;" + spacing + "" + penWidth + "" + spacing + "&RightAngleBracket;";
// }

// function chooseColor(id) {
//     penColor = window.getComputedStyle(document.getElementById(id)).backgroundColor;
//     for(var i = 0; i < document.getElementsByClassName("color").length; i++) {
//         document.getElementsByClassName("color")[i].style.outlineWidth = "0px";
//     }
//     document.getElementById(id).style.outline = "2px solid lightblue";
// }