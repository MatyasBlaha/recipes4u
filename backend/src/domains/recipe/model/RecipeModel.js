const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    ingredients: [{
        type: String,
        required: true,
    }],

    instructions: {
        type: String,
        required: true,
    },

    CookingTime: {
        type: Number,
        required: true,
    },

    difficulty: {
        type: String,
        required: true,
    },

    files: [{
        type: String,
        required: true,
    }],

    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },


}, { collection: 'recipes' });

module.exports = mongoose.model('recipes', RecipeSchema);
