// auth.js
const jwt = require('jsonwebtoken');
const User = require('../../domains/user/model/UserModel')
require('dotenv').config();


exports.auth = async (req, res, next) => {

    try {
        const token = req.cookies.token
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await decodedToken
        req.user =  user;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token, please login" });
    }
};

exports.isAdmin = async (req, res, next) => {
    const user = await User.findOne({ _id: req.body.userId });

    try{
        if(user.role === 0){
            console.log("can not auth admin")
        } else {
            next()
        }
    } catch (err) {
        res.status(401).json({
            message: "Please, login"
        });
    }
}
