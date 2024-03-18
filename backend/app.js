const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const cors = require('cors')
app.use(cors());


const User = require('./database/userModel');
const UserOTPVerification = require('./database/UserOTPVerification');
const auth = require('./roots/auth');
const dbConnect = require('./database/dbConnect');

dbConnect();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});



app.get("/", (req, res, next) => {
    res .json({ message: "Hey! This is your server response!" });
    next();
});
//register endpoint
app.post("/api/register", (req, res) => {
    //hash the password
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
                    sendOTPVerificationEmail(result, res)
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
});





//Login endpoint
app.post("/api/login", (req, res) => {
    //check if the user exists
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

                    const token = jwt.sign(
                        {
                            userId: user.id,
                            userEmail: user.email,
                        },
                        process.env.JWT_SECRET_KEY,
                        {expiresIn: "1h"}
                    );

                    res.status(200).send({
                        message: "Login successful",
                        email: user.email,
                        token,
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
});



let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD
    }
})
const sendOTPVerificationEmail = async ({_id, email}, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        const mailOption = {
            from: process.env.AUTH_USER,
            to: email,
            subject: "OTP Verification",
            html: `<p>Enter <b>${otp}<b/> in the app to verify your email adress to complete site register</p>
                    <p>This code <b>expires in 1 hour<b/>.</p>
                `
        };

        const hashedOTP = await bcrypt.hash(otp, 10);
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
}
app.post("/api/verifyOTP", async (req, res) => {
    try {
        let {userId, otp} = req.body;
        if(!userId || !otp){
            throw Error("Empty otp details are not allowed");
        } else {
            const UserOTPVerificationRecords = await UserOTPVerification.find({
                userId,
            });
            if(UserOTPVerificationRecords.length <= 0){
                throw new Error("Account record doesn't exist or has been verified already. Please sign up or Log in");
            } else {
                const {expiresAt} = UserOTPVerificationRecords[0];
                const hashedOTP = UserOTPVerificationRecords[0].otp;

                if(expiresAt < Date.now()){
                    await UserOTPVerification.deleteMany({ userId });
                    throw new Error ("Code has expired. Please request again")
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);

                    if(!validOTP) {
                        throw new Error("Invalid code passed. Check your inbox")
                    } else {
                        await User.updateOne({_id: userId}, {verified: true});
                        await UserOTPVerification.deleteMany({ userId });

                        res.json({
                            status: 'verified',
                            message: "User email verified successfully"
                        })
                    }
                }
            }
        }
    } catch (err) {
        res.json({
            status: 'failed',
            message: err.message
        })
    }
})
app.post("/api/resendOTPVerify", async (req, res) => {
    try {
        let {userId, email} = req.body;

        if(!userId || !email){
            throw Error("Empty otp details are not allowed");
        } else {
            await UserOTPVerification.deleteMany({ userId });
            await sendOTPVerificationEmail({_id: userId, email}, res)
        }
    } catch (err){
        res.json({
            status: 'failed',
            message: err.message
        })
    }
})





app.get("/api/free-endpoint", (req, res) => {
    res.json({
        message: "You are free to acccess"
    })
})

app.get("/api/auth-endpoint", auth, (req, res) => {
    res.json({
        message: "You are authenticated"
    })
})

module.exports = app;