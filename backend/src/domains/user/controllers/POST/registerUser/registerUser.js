const User = require("../../../model/UserModel");
const {sendOTPVerificationEmail} = require("../../../../email/controller/emailController");
const bcrypt = require("bcryptjs");


exports.registerUser = async (req, res) => {
    try {
        const { name, email } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {

            await sendOTPVerificationEmail(existingUser, res);
            return res.json({
                status: 'Pending',
                message: 'User already exists. OTP sent to your email for verification.',
                data: {
                    userId: existingUser._id,
                    email,
                }
            });
        }



        bcrypt
            .hash(req.body.password, 10)
            .then((hashedPassword) => {

                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    verified: false
                })

                user
                    .save()
                    .then((result) => {
                        const userId = result._id;
                        sendOTPVerificationEmail(result, res, userId)
                    })

                    .catch((err) => {
                        res.status(500).send({
                            message: "Error creating user",
                            err
                        })
                    })
            })

            .catch((err) => {
                res.status(500).send({
                    message: "Password could not be hashed",
                    err
                });
            });
    } catch (err) {

    }
};