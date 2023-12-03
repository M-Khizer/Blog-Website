const express = require('express')

const { getUser, userSignup, userLogIn } = require('../controller/user')
const { checkToken } = require('../middleware/user')



const router = express.Router()

router.get('/',getUser)

router.post('/signup',checkToken,userSignup)

router.post('/login',userLogIn,checkToken)

module.exports = router;
