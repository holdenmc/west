import express from 'express';
import http from 'http';
import socket from 'socket.io';
import bodyParser from 'body-parser';

import { init } from './connection';
import { register as registerUserRoutes } from './routes/user';
import { register as registerGameRoutes } from './routes/game';

// Connect to database
init();

// Initialize express server
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socket(server);

app.use(bodyParser.json());

registerUserRoutes(app);
registerGameRoutes(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});
// TODO: Once there are static assets
// app.use('/client', express.static(__dirname + '/client/static'));

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

