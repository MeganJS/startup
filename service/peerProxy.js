
/*
const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
    //Create a new websocket object
    const wss = new WebSocketServer({noServer:true});

    //handle protocol upgrade
    httpServer.on('upgrade', (request, socket, head)=>{
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection',ws,request);
        });
    });

    let connections = [];
    wss.on('connection', (ws)=>{
        const connection = {id: uuid.v4(), alive: true, ws: ws};
        connections.push(connection);

        ws.on('message', function message(data){
        })
    })
}
    */