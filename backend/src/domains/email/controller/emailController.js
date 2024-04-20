const bcrypt = require('bcryptjs');
const UserOTPVerification = require('../../user/model/UserOTPVerificationModel')
const UserPasswordReset = require('../../user/model/UserPasswordResetModel')

const {transporter} = require('../utils/transporter')
require('dotenv').config();



exports.sendOTPVerificationEmail = async ({ _id, email }, res) => {
    try {
         const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const hashedOTP = await bcrypt.hash(otp, 10);

        const verificationLink = `${process.env.VERIFY_EMAIL_URL}?userId=${_id}`;

        const mailOption = {
            from: process.env.AUTH_USER,
            to: email,
            subject: "OTP Verification",
            html: `<p>Enter <b>${otp}<b/> in the app to verify your email adress to complete site register</p>
                    <p>Please click on the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>
                    <p>This code <b>expires in 1 hour<b/>.</p>
                `
        };

        const newOTPVerification = await new UserOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        await newOTPVerification.save();
        await transporter.sendMail(mailOption);

        res.json({
            status: 'Pending',
            message: 'OTP sent to your email',
            data: {
                userId: _id,
                email,
            }
        })
    } catch (err){
        res.json({
            status: 'Failed',
            message: err.message,
        })
    }
};

exports.sendPasswordResetEmail = async ({ _id, email}, res) => {
    try {
        const resetToken = `${Math.floor(1000 + Math.random() * 9000)}`;
        const hashedToken = await bcrypt.hash(resetToken, 10);

        const resetLink = `${process.env.RESET_PASSWORD_URL}?resetToken=${hashedToken}`;


        const mailOption = {
            from: process.env.AUTH_USER,
            to: email,
            subject: "Reset Password",
            html: `<p>You requested a password reset. Please click on the following link, or paste it into your browser to complete the process:</p>
                   <a href="${resetLink}">${resetLink}</a>
                   <p>This link is valid for 1 hour.</p>`
        };

        const newUserPasswordReset = await new UserPasswordReset({
            userId: _id,
            email: email,
            resetToken: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });


        await newUserPasswordReset.save();
        await transporter.sendMail(mailOption);

         return res.json({
            status: 'Pending',
            message: 'Reset link sent to your email',
            data: {
                email,
            }
        })
    } catch (err) {
        return res.status(500).json({
            status: 'Failed',
            message: err.message,
        })
    }

}