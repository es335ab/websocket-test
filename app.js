//app.js
var WebSocketServer = require('ws').Server
    , http = require('http')
    , express = require('express')
    , app = express();

app.use(express.static(__dirname + '/'));
var server = http.createServer(app);
var wss = new WebSocketServer({server:server});

//Websocket接続を保存しておく
var connections = [];

var MESSAGES = [' 一生迷ってろ…！そして失い続けるんだ…貴重な機会(チャンス)をっ！','明日からがんばるんじゃない…今日…今日だけがんばるんだっ…！今日をがんばった者…今日をがんばり始めた者にのみ…明日が来るんだよ…！','奇跡なんて望むな！「勝つ」ってことは…そんな神頼みなんかじゃなく…具体的な勝算の彼方にある…現実だ…！勝つべくして勝つ…！','疑ってるうちはまだしもそれを口にしたら…戦争だろうがっ！','金は命より重い…！そこの認識をごまかす輩は生涯地を這う…！', '剥げたな…お前の化けの皮…二流だ…しょせんお前は指示待ち人間…！', '胸を張れっ！手痛く負けた時こそ…胸をっ…！', 'ピンチだけど…チャンスッ…'];

var num = 0;

//接続時
wss.on('connection', function (ws) {

    // フロントにカイジの名言をイテレーションして返す
    setInterval(function(){
      broadcast(JSON.stringify(MESSAGES[num]));
      num ++;

      if(num === MESSAGES.length) num = 0;
    }, 3000);

    //配列にWebSocket接続を保存
    connections.push(ws);
    //切断時
    ws.on('close', function () {
        connections = connections.filter(function (conn, i) {
            return (conn === ws) ? false : true;
        });
    });
    //メッセージ送信時
    ws.on('message', function (message) {
        console.log('message:', message);
        broadcast(JSON.stringify(message));
    });
});

//ブロードキャストを行う
function broadcast(message) {
    connections.forEach(function (con, i) {
        con.send(message);
    });
};

server.listen(3000);
