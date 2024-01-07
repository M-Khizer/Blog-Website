const express = require('express')

const { getUser, userSignup, userLogIn, userLogOut } = require('../controller/user')

const router = express.Router()

router.post('/signup',userSignup)

router.post('/login',userLogIn)

router.post('/logout',userLogOut)

router.get('/',getUser)

module.exports = router;