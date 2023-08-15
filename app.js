const express = require('express');
const cookieParser = require('cookie-parser');
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

app.get('/', (req, res) => {

    res.send("Hello, world!");
});

app.use(AuthRoute);

app.use(LoginMiddleware);

app.get('/api/v1/secured', (req, res) => {

    res.send('IT IS VALID');
})
app.listen(PORT, () => {
    console.log(`SERVER LISTENING AT PORT: ${PORT}`);
})