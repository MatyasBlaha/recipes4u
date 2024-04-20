const User = require("../../../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
                            {expiresIn: "24h"}
                        );

                        const role = jwt.sign(
                            {
                                userRole: user.role
                            },
                            process.env.JWT_SECRET_KEY,
                            {expiresIn: "24h"}
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