const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../model/UserModel')
const UserOTPVerification = require('../model/UserOTPVerificationModel')
const { sendOTPVerificationEmail, sendPasswordResetEmail } = require('../../email/controller/emailController')
const UserPasswordReset = require('../model/UserPasswordResetModel')


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
                //create a new user instance and collect the data
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    verified: false
                })

                //Save the new user to the database
                user
                    .save()
                    .then((result) => {
                        const userId = result._id;
                        sendOTPVerificationEmail(result, res, userId)
                    })
                    //catch error if user wasn't added to the database
                    .catch((err) => {
                        res.status(500).send({
                            message: "Error creating user",
                            err
                        })
                    })
            })
            //catch error if the password wasn't hashed
            .catch((err) => {
                res.status(500).send({
                    message: "Password could not be hashed",
                    err
                });
            });
    } catch (err) {

    }
};

exports.loginUser = async (req, res) => {
    try {
        User.findOne({email: req.body.email})
            .then((user) => {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((passwordChecked) => {

                        //check if password matches
                        if(!passwordChecked) {
                            return res.status(400).send({
                                message: "password do not match",
                            })
                        }

                        if(!user.verified) {
                            return res.status(400).send({
                                message: "Please verify your account"
                            })
                        }

                        const token = jwt.sign(
                            {
                                userId: user._id
                            },
                            process.env.JWT_SECRET_KEY,
                            {expiresIn: "1h"}
                        );

                        const role = jwt.sign(
                            {
                                userRole: user.role
                        },
                            process.env.JWT_SECRET_KEY,
                            {expiresIn: "1h"}
                        )

                        res.status(200).send({
                            message: "Login successful",
                            user: {
                                name: user.name,
                                email: user.email,
                            },
                            token,
                            role
                        });
                    })

                    .catch((err) => {

                        res.status(400).send({
                            message: "Incorrect password",
                            err
                        })
                    })
            })
            .catch((err) => {
                res.status(404).send({
                    message: "Email not found",
                    err
                })
            })
    } catch (err) {

    }
};

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

            throw new Error("Invalid dsffdsdsfds passed. Check your inbox");
        }
    } catch (err) {
        console.error(err);
        res.json({
            status: 'failed',
            message: err.message
        });
    }
};

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
        new Error("Invalid dsffdsdsfds passed")
    }
};

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
        new Error("Invalid dsffdsdsfds passed")

    }
};

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

        return res.json({message: 'heslo bylo zmeneno'});
    } catch (err){
        return res.status(500).json({message: 'chyba pri resetovani hesla'})
    }

};

exports.userInfo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decodedToken.userId;


        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Uživatel nenalezen' });
        }


        return res.status(200).json({
            name: user.name,
            email: user.email,
        });

    } catch (error) {
        console.error('Chyba při získávání informací o uživateli:', error);
        res.status(500).json({ message: 'Chyba při získávání informací o uživateli' });
    }
};