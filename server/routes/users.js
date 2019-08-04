var express = require('express');
let { checkUserRegister, checkUserLogin,} = require('../services/expressvalidators');
let { userRegister, login} = require( '../controler/user');

let { JWTSecret } = require( '../config/config');
let  expressJWt = require( 'express-jwt');

let router = express.Router();

let auth = expressJWt({
    secret: JWTSecret,
    userProperty: 'user'
});

// user registeration route
router.post('/userRegistration', checkUserRegister, userRegister);

// user login route
router.post('/userLogin', checkUserLogin, login);


// // user forgot password
// router.post('/forgetPassword', checkUserForgot, forgetPassword);

// // user reset password route 
// router.post('/reset-password', checkResetPassword, resetPassword);



module.exports =  router;
