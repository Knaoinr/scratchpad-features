var isPenDown = false;
var penType = null;

var lastPenX = 0;
var lastPenY = 0;

var penWidth = 3;
var penColor = "#000000";

const sidebarWidth = 200;

var canvasArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        //setup canvas
        this.canvas.width = screen.width - sidebarWidth;
        this.canvas.height = screen.height;
        this.context = this.canvas.getContext("2d");

        //listeners for painting
        this.canvas.addEventListener("mousedown", (ev) => {
            isPenDown = true;

            var ctx = canvasArea.context;
            switch (penType) {
                case "pen":
                    ctx.beginPath();
                    ctx.arc(ev.x - sidebarWidth, ev.y, penWidth/2, 0, 2 * Math.PI, true);
                    ctx.globalCompositeOperation = "source-over";
                    ctx.fillStyle = penColor;
                    ctx.fill();
                    break;
                case "eraser":
                    ctx.beginPath();
                    ctx.arc(ev.x - sidebarWidth, ev.y, penWidth/2, 0, 2 * Math.PI, true);
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.fillStyle = "rgba(255,255,255,1)";
                    ctx.fill();
                    break;
            }

            lastPenX = ev.x;
            lastPenY = ev.y;
        });
        this.canvas.addEventListener("mouseup", (ev) => {
            isPenDown = false;
        });
        this.canvas.addEventListener("mousemove", (ev) => {
            if (isPenDown) {
                var ctx = canvasArea.context;
                switch (penType) {
                    case "pen":
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, ev.y);
                        ctx.strokeStyle = penColor;
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        ctx.stroke();
                        break;
                    case "eraser":
                        ctx.beginPath();
                        ctx.moveTo(lastPenX - sidebarWidth, lastPenY);
                        ctx.lineTo(ev.x - sidebarWidth, ev.y);
                        ctx.strokeStyle = "rgba(255,255,255,1)";
                        ctx.lineCap = "round";
                        ctx.lineWidth = penWidth;
                        ctx.stroke();
                        break;
                }

                lastPenX = ev.x;
                lastPenY = ev.y;
            }
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}