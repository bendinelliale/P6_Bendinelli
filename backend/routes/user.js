const express = require('express');
const router = express.Router();
const UserContrl = require("../controllers/user")
const passwordVerification = require('../middleware/password-verification');
//login handle

router.post('/login', UserContrl.login)
router.post('/signup', UserContrl.signup)


module.exports  = router;