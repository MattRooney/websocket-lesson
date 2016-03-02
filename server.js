const http = require('http');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, function () {
 console.log('Listening on port' + port + '.');
});

const socketIo = require('socket.io');
const io = socketIo(server)

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__direname + '/public/index.html');
});

module.exports = server;
