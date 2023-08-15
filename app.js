const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Routes
const AuthRoute = require('./api/routes/AuthRoute');

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

    app.listen(PORT, () => {

        console.log(`SERVER LISTEN TO: ${PORT}`)
    });
});

app.get('/', (req, res) => {

    res.send("Hello, world!");
});

app.use(AuthRoute);

app.use(LoginMiddleware);

app.get('/api/v1/secured', (req, res) => {

    console.log({ message: 'You are authorized to this route' })
    res.json({ message: 'You are authorized to this route' })
})