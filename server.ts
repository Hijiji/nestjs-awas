// //웹서버 코드
// const express = require('express');
// const app = express();

// app.use("/", function(req,res){
//   res.sendFile(__dirname + 'index.html');
// });

// app.listen(8080);

// //웹소켓 열기
// const WebSocket = require('ws');
// const socket = new WebSocket.Server({
//   port:8081
// });

// //웹소켓으로 오는 유저메시지 받음
// socket.on('connection', (ws,req)=>{
//     ws.on('message',(msg)=>{
//         console.log('유저가 보낸거 : '+ msg);
//         ws.send('ㅇㅇ'); //웹소켓으로 서버-> 유저 메세지 보냄
//     });
// });