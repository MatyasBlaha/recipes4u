const UserPasswordReset = require("../../../model/UserPasswordResetModel");
const User = require("../../../model/UserModel");
const bcrypt = require("bcryptjs");


exports.resetPassword = async (req, res) => {
    try {
        const { userEmail, resetToken, newPassword} = req.body;

        let passwordResetRecord = null
        let user = ''

        if ( resetToken ){
            passwordResetRecord = await UserPasswordReset.findOne({ resetToken })
            if (!passwordResetRecord || new Date() > passwordResetRecord.expiresAt) {
                return res.status(400).send({
                    message: "Invalid reset token"
                })
            }
        } else {
            passwordResetRecord = await UserPasswordReset.findOne({userEmail})
            if(!passwordResetRecord) {
                return res.status(400).send({
                    message: `user not found`
                })
            }
        }


        user = await User.findOne({email: passwordResetRecord.email});

        if (!user) {
            return res.status(400).send({
                message: `User not found ${passwordResetRecord}`
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        await user.save();

        // await passwordResetRecord.delete();

        return res.json({message: 'password was changed'});
    } catch (err){
        return res.status(500).json({message: 'error while reset password'})
    }

};