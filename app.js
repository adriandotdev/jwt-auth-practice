const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const User = require('./api/model/User');
const Message = require('./api/model/Message');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

// Routes
const AuthRoute = require('./api/routes/AuthRoute');
const MessageRoute = require('./api/routes/MessageRoute');

// Middlewares
const { LoginMiddleware } = require('./api/middlewares/AuthMiddleware');

require('dotenv').config();

const PORT = process.env.LOCAL_DEV_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME }).then((res) => {

    console.log("CONNECTED TO DATABASE");

    server.listen(PORT, () => {

        console.log(`SERVER LISTEN TO: ${PORT}`)
    });
});

app.get('/', (req, res) => {

    res.send("Hello, world!");
});

app.use(AuthRoute);

app.use(LoginMiddleware);

app.use(MessageRoute);

io.on('connection', (socket) => {

    console.log(socket.id + " connected");

    socket.on('join_room', async data => {

        const response = await User.find();

        socket.emit('new_online_user', response);
        socket.join(data);
    });

    socket.on('send_message', async (data) => {

        const newMessage = new Message(data);

        await newMessage.save();
        const messages = await Message.find();

        console.log(messages);
        socket.to(data.to).emit('receive_messages', messages);
        socket.emit('receive_messages', messages);
    });

    socket.on('disconnect', async data => {

        console.log(socket.id + " disconnected");
    });
});
