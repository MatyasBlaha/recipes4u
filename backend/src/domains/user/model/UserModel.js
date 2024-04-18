const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pole nesmí být prázdný'],
        unique: [true, 'Jméno již je zaregistrováno']
    },

    email: {
        type: String,
        required: [true, 'Pole nesmí být prázdný'],
        unique: [true, 'Email již je zaregistrován']
    },

    password: {
        type: String,
        required: [true, "Please provide a password!"],
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
