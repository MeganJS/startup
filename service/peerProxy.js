const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const url = require('url');
//const DB = require('./database.js');

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
    wss.on('connection', (ws, req)=>{
        //console.log(req.url);
        //const params = url.parse(req.url,true).query;
        const connection = {id: uuid.v4(), alive: true, ws: ws};
        connections.push(connection);

        ws.on('message', function message(data) {
            //const str = JSON.parse(data.toString());
            console.log(JSON.stringify(str));

            connections.forEach((c) => {
                c.ws.send(data);
              });
          });
              // Remove the closed connection so we don't try to forward anymore
        ws.on('close', () => {
        const pos = connections.findIndex((o, i) => o.id === connection.id);
  
        if (pos >= 0) {
          connections.splice(pos, 1);
        }
      });

          // Respond to pong messages by marking the connection alive
        ws.on('pong', () => {
        connection.alive = true;
      });
    });

    // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };
