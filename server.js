const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`ATLI PeerJS Server Active on Port ${PORT}`);
});

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/'
});

app.use('/', peerServer);