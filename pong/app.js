var canvas = document.getElementById('myCanvas');
var topSide = document.getElementById('top');
var botSide = document.getElementById('bot');
var ctx;
var mid;
var batWidth = 20;
var batHeight = 150;
var batDistance = 50;
var netPartWidth = 10;
var netPartHeight = 50;
var ballWidth = 10;
var ballHeight = 10;
var mobileDevice = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
var mc = new Hammer(topSide);
mc.on("press", function () {
    moveBatUpwards();
});
if (isCanvas(canvas)) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mid = window.innerHeight / 2;
    ctx = canvas.getContext("2d");
}
var batLeftX = batDistance;
var batLeftY = mid - batHeight / 2;
var batRightX = window.innerWidth - batDistance * 2;
var batRightY = mid - batHeight / 2;
function isCanvas(obj) {
    return obj.tagName === 'CANVAS';
}
function drawBats() {
    ctx.fillStyle = "white";
    ctx.fillRect(batLeftX, batLeftY, batWidth, batHeight);
    ctx.fillRect(batRightX, batRightY, batWidth, batHeight);
}
function drawNet() {
    var height = window.innerHeight;
    for (var y = 25; y < height; y += 75) {
        ctx.fillRect(window.innerWidth / 2 - netPartWidth / 2, y, netPartWidth, netPartHeight);
    }
}
function drawBall() {
    if (mobileDevice) {
        ctx.fillStyle = "red";
    }
    else {
        ctx.fillStyle = "blue";
    }
    ctx.fillRect(window.innerWidth / 2 - ballWidth / 2, window.innerHeight / 2 - ballHeight / 2, ballWidth, ballHeight);
}
function paint() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawBats();
    drawNet();
    drawBall();
}
paint();
topSide.ontouchend = function () {
    moveBatUpwards();
};
botSide.ontouchend = function () {
    moveBatDownwards();
};
document.body.onkeydown = function (event) {
    if (event.which === 40) {
        moveBatDownwards();
    }
    else if (event.which === 38) {
        moveBatUpwards();
    }
};
function moveBatDownwards() {
    batLeftY += 20;
    paint();
}
function moveBatUpwards() {
    batLeftY -= 20;
    paint();
}
