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

// TODO: move this to a new file
io.on('connection', function (socket) {
    // Rooms
    //  - Lobby
    //  - Game room by game id

    /**
     * In Lobby
     * - Sending a message broadcasts it to all
     * - Creating a game broadcasts it to all users so that it can be updated on their UI
     * - Logging on, broadcasts that event to add to all users lists of online users
     */

    /**
     * In pre game
     * - Joining sends a broadcast to all players in room
     * - Updating settings broadcasts to all
     * - Starting game broadcasts
     */

    /**
     * In game
     * Every action is handled via sockets...
     */

    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });

    socket.on('createGame', (data) => {
        // Write some handler that takes the create game data
        // and uses the reference to socket to broadcast to all users

    });
});

