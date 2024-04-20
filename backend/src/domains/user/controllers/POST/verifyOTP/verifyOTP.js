const UserOTPVerification = require("../../../model/UserOTPVerificationModel");
const bcrypt = require("bcryptjs");
const User = require("../../../model/UserModel");


exports.verifyOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        if (!userId || !otp) {
            throw Error("Empty otp details are not allowed");
        }

        const userOTPVerificationRecords = await UserOTPVerification.find({ userId });


        let validOTPFound = false;
        for (const record of userOTPVerificationRecords) {
            const { expiresAt, otp: hashedOTP } = record;
            if (expiresAt >= Date.now()) {
                if (await bcrypt.compare(otp, hashedOTP)) {
                    validOTPFound = true;
                    break;
                }
            }
        }


        if (validOTPFound) {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOTPVerification.deleteMany({ userId });

            res.json({
                status: 'verified',
                message: "User email verified successfully"
            });
        } else {

            throw new Error("Invalid address passed. Check your inbox");
        }
    } catch (err) {
        console.error(err);
        res.json({
            status: 'failed',
            message: err.message
        });
    }
};