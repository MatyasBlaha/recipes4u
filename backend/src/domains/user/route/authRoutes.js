const express = require('express')
const router = express.Router()

//POST
const {registerUser} = require('../controllers/POST/registerUser/registerUser')
const {loginUser} = require('../controllers/POST/loginUser/loginUser')
const {verifyOTP} = require('../controllers/POST/verifyOTP/verifyOTP')
const {resendOTPVerify} = require('../controllers/POST/resendOTPVefify/resendOTPVerify')
const {resetPassword} = require('../controllers/POST/resetPassword/resetPassword')
const {forgotPassword} = require('../controllers/POST/forgotPassword/forgotPassword')

//GET
const {userInfo} = require('../controllers/GET/userInfo/userInfo')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verifyOTP', verifyOTP)
router.post('/resendOTPVerify', resendOTPVerify)
router.post('/resetPassword', resetPassword)
router.post('/forgotPassword', forgotPassword)

router.get('/userInfo', userInfo)

module.exports = router;