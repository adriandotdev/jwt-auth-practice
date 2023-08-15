const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    givenName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    middleName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    lastName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    profileImage: {
        type: mongoose.SchemaTypes.String,
    },
    friends: {
        type: mongoose.SchemaTypes.Array
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;