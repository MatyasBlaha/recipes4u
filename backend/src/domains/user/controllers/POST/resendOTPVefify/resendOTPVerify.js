const UserOTPVerification = require("../../../model/UserOTPVerificationModel");
const {sendOTPVerificationEmail} = require("../../../../email/controller/emailController");


exports.resendOTPVerify = async (req, res) => {
    try {
        const { userId, email } = req.body;

        await UserOTPVerification.deleteMany({ userId });

        await sendOTPVerificationEmail({ _id: userId, email }, res);

        res.json({
            status: 'success',
            message: 'OTP resent to your email.'
        });
    } catch (err) {
        new Error("Invalid url passed")
    }
};