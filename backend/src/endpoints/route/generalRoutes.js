const express = require('express');
const router = express.Router();
const { freeEndpoint, authEndpoint } = require('../controller/generalController');
const {verifyOTP} = require('../../domains/user/controllers/POST/verifyOTP/verifyOTP')
const {resendOTPVerify} = require('../../domains/user/controllers/POST/resendOTPVefify/resendOTPVerify')
const {auth} = require('../middleware/auth');
const corsMiddleware = require('../middleware/cors');

router.get('/free-endpoint', corsMiddleware, freeEndpoint);
router.get('/auth-endpoint',corsMiddleware, auth, authEndpoint);
router.get('/api/verifyEmail', (req, res) => {
    try {
        res.sendFile('verifyEmail.html', { root: 'verifyEmail.html' });
    } catch (err) {
        res.status(500).json({ error: 'Error sending the file' });
    }
})


module.exports = router;

