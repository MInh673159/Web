let port = 3200;

const io = require('socket.io')(
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    }
);
io.listen(port);



global.io = io;
module.exports = {};
