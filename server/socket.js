const { Server } = require('socket.io');
const { server } = require('./app');

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('friendshipCreated', (data) => {
        console.log('Friendship created:', data);
        // В этом месте вы можете отправить уведомление другому пользователю
        // Например:
        // io.emit('notificationToUser', { userId: data.receiverId, message: 'У вас новая заявка!' });
    });
});

module.exports = { io };
