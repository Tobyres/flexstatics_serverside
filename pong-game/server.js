var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Game = /** @class */ (function () {
    function Game() {
    }
    return Game;
}());
var Player = /** @class */ (function () {
    function Player(name, id, player2Id) {
        this.name = name;
        this.id = id;
        this.player2Id = player2Id;
    }
    return Player;
}());
var BallData = /** @class */ (function () {
    function BallData(ballWidth, ballHeight, ballXConst, ballYConst) {
        this.ballWidth = ballWidth;
        this.ballHeight = ballHeight;
        this.ballXConst = ballXConst;
        this.ballYConst = ballYConst;
    }
    return BallData;
}());
var ballData = new BallData(0, 0, 0, 0);
var playersInLobby = [];
var id = 0;
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    socket.on('nameSent', function (name) {
        playersInLobby.push(new Player(name, id, -1));
        id++;
        socket.emit('sendList', playersInLobby);
        io.emit('sendListF5', playersInLobby);
    });
    socket.on('sendBallData', function (bdata) {
        var temp = bdata;
        ballData = temp;
        console.log("real: " + ballData.ballXConst);
    });
    socket.on('initGame', function (ids) {
        io.emit('initGameFor', ids);
    });
    /*
        socket.on('spawnRequest', function(recievers: string){
            console.log("got it: " + recievers);
            console.log("data: " + ballData.ballXConst);
        });*/
    socket.on('spawnRequest', function (recievers) {
        ballData.ballX = ballData.ballXConst;
        ballData.ballY = ballData.ballYConst;
        do {
            ballData.angleX = Math.floor(Math.random() * 26) - 15;
            ballData.angleY = Math.floor(Math.random() * 26) - 15;
        } while (ballData.angleX === 0 || ballData.angleY === 0 || (ballData.angleX <= 5 && ballData.angleX >= -5) || (ballData.angleY <= 5 && ballData.angleY >= -5));
        io.emit('sendSpawnData', recievers, ballData);
    });
    socket.on('batLocChanged', function (message) {
        io.emit('refreshBatLoc', message);
    });
});
http.listen(3000, function () {
    console.log('listening on port 3000');
});
