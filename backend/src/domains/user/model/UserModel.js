const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "input can't be empty"],
        unique: [true, 'name is already exist']
    },

    email: {
        type: String,
        required: [true, 'input can\'t be empty'],
        unique: [true, 'email is already exist']
    },

    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },

    verified: {
        type: Boolean,
        default: false
    },

    savedRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipes'
    }],

    role: {
        type: Number,
        default: 0,
    }

}, { collection: 'users' });

module.exports = mongoose.model('users', userSchema);
