const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD
    }
})