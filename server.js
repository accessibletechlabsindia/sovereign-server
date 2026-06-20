const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, peerId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', peerId);

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', peerId);
        });
    });

    socket.on('signal', (roomId, data) => {
        socket.to(roomId).emit('signal', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`ATLI Server Active on Port ${PORT}`);
});