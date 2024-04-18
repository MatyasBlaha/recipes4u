const express = require('express')
const router = express.Router()
const { registerUser, loginUser, verifyOTP, resendOTPVerify, forgotPassword, resetPassword, userInfo } = require('../controller/authController');


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verifyOTP', verifyOTP)
router.post('/resendOTPVerify', resendOTPVerify)
router.post('/resetPassword', resetPassword)
router.post('/forgotPassword', forgotPassword)

router.get('/userInfo', userInfo)

module.exports = router;