const mongoose = require('mongoose');

const UserOTPVerificationSchema = new mongoose.Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
});

const UserOTPVerificationModel = mongoose.model(
    'UserOTPVerificationModel',
    UserOTPVerificationSchema
)

module.exports = UserOTPVerificationModel