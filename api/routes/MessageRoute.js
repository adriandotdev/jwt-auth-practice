const express = require('express');
const Message = require('../model/Message');
const router = express.Router();

router.get('/api/v1/messages', async (req, res) => {

    const messages = await Message.find();

    return res.status(200).json(messages);
});

router.delete('/api/v1/messages', async (req, res) => {
    await Message.deleteMany({});
})
module.exports = router;