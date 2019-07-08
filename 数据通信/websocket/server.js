const http = require("http");
const io = require("socket.io");
let server = http.createServer((req, res) => {});
server.listen(8081);
let websocket = io.listen(server);
websocket.on('connection', sock => {
    setInterval(() => {
        sock.emit("cltime", new Date().getTime());
    }, 1000);
})