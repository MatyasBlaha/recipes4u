const mongoose = require('mongoose')

const UserPasswordResetSchema = new mongoose.Schema({
    userId: String,
    email: String,
    resetToken: String,
    createdAt: Date,
    expiresAt: Date,
})

const UserPasswordResetModel = mongoose.models.UserPasswordResetSchema
    ? mongoose.model('UserPasswordResetModel')
    : mongoose.model(
        'UserPasswordResetModel',
        new mongoose.Schema({
            userId: String,
            email: String,
            resetToken: String,
            createdAt: Date,
            expiresAt: Date,
        })
    );

module.exports = UserPasswordResetModel