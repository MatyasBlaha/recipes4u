const User = require("../../../model/UserModel");
const {sendPasswordResetEmail} = require("../../../../email/controller/emailController");

exports.forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;

        const existingUser = await User.findOne({ email: email });

        if(existingUser){
            await sendPasswordResetEmail(existingUser, res);
            return res.json({
                status: 'Pending',
                message: 'User already exists. OTP sent to your email for verification.',
                data: {
                    existingUser
                }
            });
        } else {
            return res.status(404).json({
                status: 'Error',
                message: 'User does not exist.',
            });
        }

    } catch (err) {
        new Error("Invalid url passed")

    }
};