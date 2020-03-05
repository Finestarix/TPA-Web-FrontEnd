var io = require('socket.io')(4202);

console.log('Server Started Successfully');

io.on('connection', function(socket) {
    
    console.log('New Client Connected');
    
    socket.on('chat', function(msg) {
        io.emit('chat', msg);
    });

    socket.on('train', function(msg) {
        io.emit('train', msg);
    });

    socket.on('flight', function(msg) {
        io.emit('flight', msg);
    });

	socket.on('hotel', function(msg) {
        io.emit('hotel', msg);
    });

	socket.on('blog', function(msg) {
        io.emit('blog', msg);
    });

    socket.on('event', function(msg) {
        io.emit('event', msg);
    });

});

