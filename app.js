const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.LOCAL_DEV_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {

    res.send("Hello, world!");
});

app.listen(PORT, () => {
    console.log(`SERVER LISTENING AT PORT: ${PORT}`);
})