// Import modules
const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages.js');
const {userJoin, getCurrentUser, userLeaves, getRoomUsers} = require('./utils/users.js');

// Initate variables
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const messengerBot = 'Messenger Bot';


// Set Static website folder
app.use(express.static(path.join(__dirname, 'public')));

// Runs when user connects
io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        
        // Emits message to user
        socket.emit('message', formatMessage(messengerBot, 'Welcome to Messenger!'));

        // Broadcast message to every other user
        socket.broadcast.to(user.room).emit('message', formatMessage(messengerBot, `${user.username} has joined the chat`));
        
        // Send users and room info (for side navigation bar)
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    });
    
    // Listen for chatMessage
    socket.on('chatMessage', chatMessage => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, chatMessage));
    });

    //Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeaves(socket.id);
        if (user) {
            socket.broadcast.to(user.room)
            .emit('message', formatMessage(messengerBot, `${user.username} has left the chat`));
            
            // Send users and room info (for side navigation bar)
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});





const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log('Server running on port ' + PORT));

