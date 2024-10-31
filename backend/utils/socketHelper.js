let io;
const userSocketMap = new Map();

function initializeIo(server) {
    io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true
        }
    });
    return io;
}

function getIo() {
    return io;
}

module.exports = {
    initializeIo,
    getIo,
    userSocketMap
};
