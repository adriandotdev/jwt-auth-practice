const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    from: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    to: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    reaction: {
        type: mongoose.SchemaTypes.String
    },
    hasReply: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;