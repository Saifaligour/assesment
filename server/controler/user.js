let { User } =  require( '../db/users');
let { JwtSign } =  require( '../services/services.js');
let jwt =  require( 'jsonwebtoken');
let bcrypt =  require( 'bcrypt');
let { JWTSecret, } =  require( '../config/config');
let { comparePassword } =  require( '../services/services');


/**
 * user registration controller 
 * @param {String} firstname;
 * @param {String} lastname;
 * @param {String} email;
 * @param {String} password;
 * @param {String} userLangulage;
 * @param {String} referralCode;
 * 
 * 
 */

let userRegister = async (req, res, ) => {
    let { firstname, lastname, email, password, userLanguage, } = req.body;
    email = email.toLowerCase()

    userLanguage = userLanguage == '' ? 'en' : userLanguage;
    var user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        language: userLanguage,
    };



    User.findOne({ email: email }, async (err, data) => {
        /**
         *  checking if email id is already exists */

        if (err || data != null) {
            res.status(200).json({ success: false, msg: "This email already exists please provide another email address!", type: "email exists" });
        } else {
            /** 
             * if email id is not registered then create new account
             * */

            /**
             * hashing user password 
             */
            let salt = await bcrypt.genSaltSync(10);
            user.password = await bcrypt.hashSync(user.password, salt);

            /**
             * createing new user in the database
             */
            User.create(user, (err) => {
                if (err) {
                    res.status(400).json({ status: 'invalid' });
                    JwtSign({ email: user.email }, (err, token) => {
                        if (err) {
                            throw err;
                        } else {

                        }
                    });
                } else {
                    res.status(200).json({ success: true, msg: "Thank You for Your Registration Please Check Your Email To Proceed Login", type: "email verification", });



                }
            })
        }

    })
}

/**
user login controller 
* @param {String} email;
* @param {String} password;
*/
let login = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        User.findOne({ email: email }, (err, user) => {
            if (err || user == null) {
                res.status(200).json({ success: false, msg: "Please check your email or password", type: "invalid email or password" });
            } else {

                let isMatch = comparePassword(password, user.password);
                if (isMatch) {


                    jwt.sign({
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        mobile: user.mobile,
                        language: user.language,

                    }, JWTSecret, { expiresIn: 60 * 60 * 60 }, (err, token) => {
                        if (err) {
                            throw err;
                        } else {
                            res.status(200).json({ token, success: true, msg: 'Login Successfully', type: 'login' });
                        }
                    });


                } else {
                    res.status(200).json({ success: false, msg: 'Please check your email or password', type: 'details not match' });
                }


            }
        });
    } catch (error) {
        console.log(error);
    }
}



// /**
// user reset Password controller 
// * @param {String} email;
// */
// let forgetPassword = async (req, res, next) => {
//     try {
//         User.findOne({ email: req.body.email }, (err, user) => {
//             if (err) {
//                 res.status(500).json({ success: false, msg: err, type: 'forgot password' });
//             }
//             if (user) {
//                 let mailOptions;
//                 JwtSign({ email: user.email }, (err, token) => {
//                     if (err) {
//                         res.status(500).json({ success: false, msg: 'Error in genrating forgot token', type: 'forgot password' });
//                     } else {
//                         forgotVerifyTemplate.findOne({ mailType: 'reset-password' }, (err, emailTemplate) => {
//                             if (err) {
//                                 var htmldata = '<style>@font-face { font-family: "roboto"; src: url("https://s3.eu-central-1.amazonaws.com/wallebi/trenchfree.otf"); }</style><table style="background:#f6f6f6; width:100%;text-align:center; font-family:trench;"><tr> <td><table align="center" width="600" style=" background:#fff;"><tbody><tr style="background:#fff;"><td align="center"><img src="https://api.wallebi.asia/email_images/top_bg_register.png" alt="logo" style="padding-bottom:20px;"/></td></tr><tr><td align="" style="padding-left:20px;"><img src="https://api.wallebi.asia/email_images/register_logo.png" alt="logo" width=""/></td></tr><tr><td align="center" style=" padding:30px 0;"><img src="https://api.wallebi.asia/email_images/new_password2.png" alt="logo" width=""/></td></tr><tr><td align=""><b style="font-size:30px; color:#282828; font-weight:bold; padding-left:28px;">Hi ' + user.firstname + ',</b></td></tr><tr><td><P style="margin: 0px; padding: 0px 25px 20px 25px; line-height: 45px; font-size: 27px; color: #282828;">We Have Received A Request To Reset Your Wallebi Asia Account Password.<br />Please Click Below To Change Your Password:</P></td></tr><tr align="center"><td><a href=' + req.headers.origin + '/reset-password?token=' + token + '" style="background:#014596; padding: 7px 15px 7px 15px; border-radius:10px; font-size:30px; color:#fff; text-decoration:none;">Reset Password:</a></td></tr><tr><td style="text-align:center; font-size:18px; padding:20px 25px 20px 25px; line-height:40px;"><P>If You Have Not Requested A Password Reset. Then Please Login To Your Account At Wallebi.asia. Change Your Password And Insure Your Security Features Are Uplodate Enabled.</P></td></tr><tr align="center"><td><P style="text-align:centerl; margin:0px; padding-top:30px;  font-size:30px; color:#282828;">- Need Help ? <span><a style="color:#014596; text-decoration:none;" href="mailto:support@wallebi.asia">Contact Us -</a></span></P></td></tr><tr><td><P style="text-align:center; margin:0px; padding:20px 0; font-size:30px; color:#282828;">- Available Soon on - </P></td></tr><tr><td><table><tr><td style="padding-left:30px;"><a href="#"><img src="https://api.wallebi.asia/email_images/app-store.png" /></a></td><td style="padding-left:30px;"><a href="#"><img src="https://api.wallebi.asia/email_images/google.png" /></a></td></tr></table></td></tr><tr><td><P style="text-align:center; margin-top:30px; padding-bottom:15px; font-size:30px; color:#282828;">- Let`s get Social -</P></td></tr><tr style="text-align: center;"><td class="social"><a style="margin:0 10px;" href="https://www.facebook.com/pg/wallebi.asia" target="_blank"><img src="https://api.wallebi.asia/email_images/facebook.png" alt="facebook" /></a> <a style="margin:0 10px;" href="https://www.instagram.com/wallebi.asia " target="_blank"><img src="https://api.wallebi.asia/email_images/intagram.png" alt="instagram" /></a> <a style="margin:0 10px;" href="https://twitter.com/Wallebi_asia" target="_blank"><img src="https://api.wallebi.asia/email_images/twitter.png" alt="twitter" /></a> <a style="margin:0 10px;" href="https://wa.me/+447448436511" target="_blank"><img src="https://api.wallebi.asia/email_images/whatsapp.png" alt="whatsap" /></a> <a style="margin:0 10px;" href="https://t.me/wallebi " target="_blank"><img src="https://api.wallebi.asia/email_images/telegram.png" alt="telegram" /></a></td></tr><tr><td><P style="text-align:center; margin-top:10px; padding-bottom:0px; font-size:20px; color:#282828;">@ Wallebi Asia LTD 2018. All rights reserved</P></td></tr><tr style="background:#fff;"><td align="center"><img src="https://api.wallebi.asia/email_images/bootam_bg.png" alt="logo"/></td></tr></tbody></table></td></tr></table>'
//                                 mailOptions = {
//                                     =  require(: sender, // sender address
//                                     to: user.email, // list of receivers
//                                     subject: 'forget password email verification', // Subject line
//                                     html: htmldata // html body
//                                 }
//                             }
//                             if (emailTemplate == undefined || emailTemplate == '' || emailTemplate == null) {
//                                 var htmldata = '<style>@font-face { font-family: "roboto"; src: url("https://s3.eu-central-1.amazonaws.com/wallebi/trenchfree.otf"); }</style><table style="background:#f6f6f6; width:100%;text-align:center; font-family:trench;"><tr> <td><table align="center" width="600" style=" background:#fff;"><tbody><tr style="background:#fff;"><td align="center"><img src="https://api.wallebi.asia/email_images/top_bg_register.png" alt="logo" style="padding-bottom:20px;"/></td></tr><tr><td align="" style="padding-left:20px;"><img src="https://api.wallebi.asia/email_images/register_logo.png" alt="logo" width=""/></td></tr><tr><td align="center" style=" padding:30px 0;"><img src="https://api.wallebi.asia/email_images/new_password2.png" alt="logo" width=""/></td></tr><tr><td align=""><b style="font-size:30px; color:#282828; font-weight:bold; padding-left:28px;">Hi ' + user.firstname + ',</b></td></tr><tr><td><P style="margin: 0px; padding: 0px 25px 20px 25px; line-height: 45px; font-size: 27px; color: #282828;">We Have Received A Request To Reset Your Wallebi Asia Account Password.<br />Please Click Below To Change Your Password:</P></td></tr><tr align="center"><td><a href="' + req.headers.origin + '/reset-password?token=' + token + '" style="background:#014596; padding: 7px 15px 7px 15px; border-radius:10px; font-size:30px; color:#fff; text-decoration:none;">Reset Password:</a></td></tr><tr><td style="text-align:center; font-size:18px; padding:20px 25px 20px 25px; line-height:40px;"><P>If You Have Not Requested A Password Reset. Then Please Login To Your Account At Wallebi.asia. Change Your Password And Insure Your Security Features Are Uplodate Enabled.</P></td></tr><tr align="center"><td><P style="text-align:centerl; margin:0px; padding-top:30px;  font-size:30px; color:#282828;">- Need Help ? <span><a style="color:#014596; text-decoration:none;" href="mailto:support@wallebi.asia">Contact Us -</a></span></P></td></tr><tr><td><P style="text-align:center; margin:0px; padding:20px 0; font-size:30px; color:#282828;">- Available Soon on - </P></td></tr><tr><td><table><tr><td style="padding-left:30px;"><a href="#"><img src="https://api.wallebi.asia/email_images/app-store.png" /></a></td><td style="padding-left:30px;"><a href="#"><img src="https://api.wallebi.asia/email_images/google.png" /></a></td></tr></table></td></tr><tr><td><P style="text-align:center; margin-top:30px; padding-bottom:15px; font-size:30px; color:#282828;">- Let`s get Social -</P></td></tr><tr style="text-align: center;"><td class="social"><a style="margin:0 10px;" href="https://www.facebook.com/pg/wallebi.asia" target="_blank"><img src="https://api.wallebi.asia/email_images/facebook.png" alt="facebook" /></a> <a style="margin:0 10px;" href="https://www.instagram.com/wallebi.asia " target="_blank"><img src="https://api.wallebi.asia/email_images/intagram.png" alt="instagram" /></a> <a style="margin:0 10px;" href="https://twitter.com/Wallebi_asia" target="_blank"><img src="https://api.wallebi.asia/email_images/twitter.png" alt="twitter" /></a> <a style="margin:0 10px;" href="https://wa.me/+447448436511" target="_blank"><img src="https://api.wallebi.asia/email_images/whatsapp.png" alt="whatsap" /></a> <a style="margin:0 10px;" href="https://t.me/wallebi " target="_blank"><img src="https://api.wallebi.asia/email_images/telegram.png" alt="telegram" /></a></td></tr><tr><td><P style="text-align:center; margin-top:10px; padding-bottom:0px; font-size:20px; color:#282828;">@ Wallebi Asia LTD 2018. All rights reserved</P></td></tr><tr style="background:#fff;"><td align="center"><img src="https://api.wallebi.asia/email_images/bootam_bg.png" alt="logo"/></td></tr></tbody></table></td></tr></table>'
//                                 mailOptions = {
//                                     =  require(: sender, // sender address
//                                     to: user.email, // list of receivers
//                                     subject: 'forget password email verification', // Subject line
//                                     html: htmldata // html body
//                                 }
//                             } else {
//                                 if (user.language == 'fa') {
//                                     var emailHtml = emailTemplate.emailBodyFarsi;
//                                     var emailHtml = emailHtml.replace("{user_name}", user.firstname);
//                                     var resetLink = '<a href="' + req.headers.origin + '/reset-password?token=' + token + '" style="background:#014596; padding: 7px 15px 7px 15px; border-radius:10px; font-size:30px; color:#fff; text-decoration:none;">باز نشاندن رمز عبور</a>'
//                                     var emailHtml = emailHtml.replace("{reset_password}", resetLink);
//                                     var htmldata = '<style>@font-face { font-family: "roboto"; src: url("https://s3.eu-central-1.amazonaws.com/wallebi/trenchfree.otf"); }</style>' + emailHtml;
//                                     //reset password email
//                                     mailOptions = {
//                                         =  require(: "admin@wallebi.asia", // sender address
//                                         to: user.email, // list of receivers
//                                         subject: emailTemplate.subjectFarsi, // Subject line
//                                         //text: 'http://'+req.headers.host+'/reset-password?token='+token // html body
//                                         html: htmldata
//                                     }
//                                 } else {
//                                     var emailHtml = emailTemplate.emailBody;
//                                     var emailHtml = emailHtml.replace("{user_name}", user.firstname);
//                                     var resetLink = '<a href="' + req.headers.origin + '/reset-password?token=' + token + '" style="background:#014596; padding: 7px 15px 7px 15px; border-radius:10px; font-size:30px; color:#fff; text-decoration:none;">Reset Password</a>'
//                                     var emailHtml = emailHtml.replace("{reset_password}", resetLink);

//                                     var htmldata = '<style>@font-face { font-family: "roboto"; src: url("https://s3.eu-central-1.amazonaws.com/wallebi/trenchfree.otf"); }</style>' + emailHtml;
//                                     //reset password email
//                                     mailOptions = {
//                                         =  require(: "admin@wallebi.asia", // sender address
//                                         to: user.email, // list of receivers
//                                         subject: emailTemplate.subject, // Subject line
//                                         //text: 'http://'+req.headers.host+'/reset-password?token='+token // html body
//                                         html: htmldata
//                                     }
//                                 }
//                             }
//                             mailer(mailOptions);
//                             res.status(200).json({ success: true, msg: "Please check your email for reset password process", type: "forget password", });
//                         });
//                     }
//                 });
//             } else {
//                 res.json({ success: false, msg: 'User not found', type: 'Forgot Password' });
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

// /**
// user reset Password controller 
// * @param {String} email;
// */
// let resetPassword = async (req, res, next) => {
//     try {
//         jwt.verify(req.body.tokens, JWTSecret, (err, decode) => {
//             if (err) {
//                 res.json({ success: false, msg: 'Your link is expired', type: 'reset password' });
//             } else {
//                 var email = decode.email;
//                 User.findOne({ email: email }, (err, user) => {
//                     if (err) {
//                         res.json({ success: false, msg: err, type: 'reset password' });
//                     } else {
//                         bcrypt.hash(req.body.password, 10, (err, hash) => {
//                             var password = hash;
//                             User.findOneAndUpdate({ email: email }, { password: password }, (err, data) => {
//                                 if (err) {
//                                     res.json({ success: false, msg: err, type: "password update error" });
//                                 } else {
//                                     let mailOptions;
//                                     resetPasswordTemplate.findOne({ mailType: 'password-updated' }, (err, emailTemplate) => {
//                                         if (err) {
//                                             var htmldata = '<style>@font-face { font-family: "trench"; src: url("https://s3.eu-central-1.amazonaws.com/wallebi/trenchfree.otf"); }</style><table style="background:#f6f6f6; width:100%;text-align:center; font-family:trench;"><tr><td><table align="center" width="600" style=" background:#fff;"><tbody><tr style="background:#fff;"><td align="center"><img src="https://api.wallebi.asia/email_images/top_bg_register.png" style="padding-bottom:20px;"/></td></tr><tr> <td align="" style="padding-left:20px;"><img src="https://api.wallebi.asia/email_images/register_logo.png" alt="logo" width=""/></td> </tr> <tr> <td align="center" style=" padding:30px 0;"><img src="https://api.wallebi.asia/email_images/new_password.png" alt="logo" width=""/></td> </tr> <tr> <td align="center"><b style="font-size:35px; color:#282828; font-weight:bold;">Hi ' + user.firstname + '</b></td> </tr> <tr> <td><P style="margin: 0px; padding: 0px 25px 0px 25px; line-height: 45px; font-size: 43px; color: #282828; text-align:center;">Your Password has been successfully changed.</P></td> </tr> <tr > <td style="text-align:center; font-size:30px; padding:20px 25px 20px 25px; line-height:40px;"><P>You new wallebi password has been set. <br />You can now access your Account.</P></td> </tr> <tr align="center"> <td><a href="#" style="background:#35b9b2; padding: 7px 15px 7px 15px; font-size:30px; color:#282828; text-decoration:none;">Login to Wallebi</a></td> </tr> <tr align="center"> <td><P style="text-align:centerl; margin:0px; padding-top:30px; font-size:30px; color:#282828;">- Need Help ? <span><a style="color:#35b9b2; text-decoration:none;" href="mailto:support@wallebi.asia">Contact Us -</a></span></P></td> </tr> <tr> <td><P style="text-align:center; margin:0px; padding:20px 0; font-size:30px; color:#282828;">- Available Soon on - </P></td> </tr> <tr> <td><table> <tr> <td style="padding-left:30px;"><a href="#"><img src="https://api.wallebi.asia/email_images/app-store.png" /></a></td> <td style="padding-left:30px;"><a href="#"><img src="https://api.wallebi.asia/email_images/google.png" /></a></td> </tr> </table></td> </tr> <tr> <td><P style="text-align:center; margin-top:30px; padding-bottom:15px; font-size:30px; color:#282828;">- Let`s get Social -</P></td> </tr> <tr style="text-align: center;"> <td class="social"><a style="margin:0 10px;" href="https://www.facebook.com/pg/wallebi.asia" target="_blank"><img src="https://api.wallebi.asia/email_images/facebook.png" alt="facebook" /></a> <a style="margin:0 10px;" href="https://www.instagram.com/wallebi.asia " target="_blank"><img src="https://api.wallebi.asia/email_images/intagram.png" alt="instagram" /></a> <a style="margin:0 10px;" href="https://twitter.com/Wallebi_asia" target="_blank"><img src="https://api.wallebi.asia/email_images/twitter.png" alt="twitter" /></a> <a style="margin:0 10px;" href="https://wa.me/+447448436511" target="_blank"><img src="https://api.wallebi.asia/email_images/whatsapp.png" alt="whatsap" /></a> <a style="margin:0 10px;" href="https://t.me/wallebi " target="_blank"><img src="https://api.wallebi.asia/email_images/telegram.png" alt="telegram" /></a></td> </tr> <tr> <td><P style="text-align:center; margin-top:10px; padding-bottom:0px; font-size:20px; color:#282828;">@ Wallebi Asia LTD 2018. All rights reserved</P></td> </tr> <tr style="background:#fff;"> <td align="center"><img src="https://api.wallebi.asia/email_images/bootam_bg.png" alt="logo"/></td> </tr> </tbody> </table></td> </tr></table>';
//                                             mailOptions = {
//                                                 =  require(: "admin@wallebi.asia", // sender address
//                                                 to: user.email, // list of receivers
//                                                 subject: 'Wallebi Asia Password help has arrived!', // Subject line
//                                                 //text: 'http://'+req.headers.host+'/reset-password?token='+token // html body
//                                                 html: htmldata
//                                             }
//                                         }
//                                         if (emailTemplate == undefined || emailTemplate == '' || emailTemplate == null) {
//                                             var htmldata = '<style>@font-face { font-family: "trench"; src: url("https://s3.eu-central-1.amazonaws.com/wallebi/trenchfree.otf"); }</style><table style="background:#f6f6f6; width:100%;text-align:center; font-family:trench;"><tr><td><table align="center" width="600" style=" background:#fff;"><tbody><tr style="background:#fff;"><td align="center"><img src="https://api.wallebi.asia/email_images/top_bg_register.png" style="padding-bottom:20px;"/></td></tr><tr> <td align="" style="padding-left:20px;"><img src="https://api.wallebi.asia/email_images/register_logo.png" alt="logo" width=""/></td> </tr> <tr> <td align="center" style=" padding:30px 0;"><img src="https://api.wallebi.asia/email_images/new_password.png" alt="logo" width=""/></td> </tr> <tr> <td align="center"><b style="font-size:35px; color:#282828; font-weight:bold;">Hi ' + user.firstname + '</b></td> </tr> <tr> <td><P style="margin: 0px; padding: 0px 25px 0px 25px; line-height: 45px; font-size: 43px; color: #282828; text-align:center;">Your Password has been successfully changed.</P></td> </tr> <tr > <td style="text-align:center; font-size:30px; padding:20px 25px 20px 25px; line-height:40px;"><P>You new wallebi password has been set. <br />You can now access your Account.</P></td> </tr> <tr align="center"> <td><a href="#" style="background:#35b9b2; padding: 7px 15px 7px 15px; font-size:30px; color:#282828; text-decoration:none;">Login to Wallebi</a></td> </tr> <tr align="center"> <td><P style="text-align:centerl; margin:0px; padding-top:30px; font-size:30px; color:#282828;">- Need Help ? <span><a style="color:#35b9b2; text-decoration:none;" href="mailto:support@wallebi.asia">Contact Us -</a></span></P></td> </tr> <tr> <td><P style="text-align:center; margin:0px; padding:20px 0; font-size:30px; color:#282828;">- Available Soon on - </P></td> </tr> <tr> <td><table> <tr> <td style="padding-left:30px;"><a href="#"><img src="https://api.wallebi.asia/email_images/app-store.png" /></a></td> <td style="padding-left:30px;"><a href="#"><img src="https://api.wallebi.asia/email_images/google.png" /></a></td> </tr> </table></td> </tr> <tr> <td><P style="text-align:center; margin-top:30px; padding-bottom:15px; font-size:30px; color:#282828;">- Let`s get Social -</P></td> </tr> <tr style="text-align: center;"> <td class="social"><a style="margin:0 10px;" href="https://www.facebook.com/pg/wallebi.asia" target="_blank"><img src="https://api.wallebi.asia/email_images/facebook.png" alt="facebook" /></a> <a style="margin:0 10px;" href="https://www.instagram.com/wallebi.asia " target="_blank"><img src="https://api.wallebi.asia/email_images/intagram.png" alt="instagram" /></a> <a style="margin:0 10px;" href="https://twitter.com/Wallebi_asia" target="_blank"><img src="https://api.wallebi.asia/email_images/twitter.png" alt="twitter" /></a> <a style="margin:0 10px;" href="https://wa.me/+447448436511" target="_blank"><img src="https://api.wallebi.asia/email_images/whatsapp.png" alt="whatsap" /></a> <a style="margin:0 10px;" href="https://t.me/wallebi " target="_blank"><img src="https://api.wallebi.asia/email_images/telegram.png" alt="telegram" /></a></td> </tr> <tr> <td><P style="text-align:center; margin-top:10px; padding-bottom:0px; font-size:20px; color:#282828;">@ Wallebi Asia LTD 2018. All rights reserved</P></td> </tr> <tr style="background:#fff;"> <td align="center"><img src="https://api.wallebi.asia/email_images/bootam_bg.png" alt="logo"/></td> </tr> </tbody> </table></td> </tr></table>';
//                                             mailOptions = {
//                                                 =  require(: "admin@wallebi.asia", // sender address
//                                                 to: user.email, // list of receivers
//                                                 subject: 'Wallebi Asia Password help has arrived!', // Subject line
//                                                 //text: 'http://'+req.headers.host+'/reset-password?token='+token // html body
//                                                 html: htmldata
//                                             }
//                                         } else {
//                                             if (user.language == "fa") {
//                                                 var emailHtml = emailTemplate.emailBodyFarsi;
//                                                 emailHtml = emailHtml.replace("{user_name}", user.firstname);
//                                                 var resetLink = '<a href="http://www.wallebi.asia/reset-password?token=' + req.body.token + '" style="background:#014596; padding: 7px 15px 7px 15px; border-radius:10px; font-size:30px; color:#fff; text-decoration:none;">باز نشاندن رمز عبور</a>';
//                                                 var htmldata = '<style>@font-face { font-family: "roboto"; src: url("https://s3.eu-central-1.amazonaws.com/wallebi/trenchfree.otf"); }</style>' + emailHtml;
//                                                 //reset password email
//                                                 mailOptions = {
//                                                     =  require(: "admin@wallebi.asia", // sender address
//                                                     to: user.email, // list of receivers
//                                                     subject: emailTemplate.subjectFarsi, // Subject line
//                                                     //text: 'http://'+req.headers.host+'/reset-password?token='+token // html body
//                                                     html: htmldata
//                                                 }
//                                             } else {
//                                                 var emailHtml = emailTemplate.emailBody;
//                                                 emailHtml = emailHtml.replace("{user_name}", user.firstname);
//                                                 var resetLink = '<a href="http://www.wallebi.asia/reset-password?token=' + req.body.token + '" style="background:#014596; padding: 7px 15px 7px 15px; border-radius:10px; font-size:30px; color:#fff; text-decoration:none;">Reset Password</a>'
//                                                 var htmldata = '<style>@font-face { font-family: "roboto"; src: url("https://s3.eu-central-1.amazonaws.com/wallebi/trenchfree.otf"); }</style>' + emailHtml;
//                                                 //reset password email
//                                                 mailOptions = {
//                                                     =  require(: "admin@wallebi.asia", // sender address
//                                                     to: user.email, // list of receivers
//                                                     subject: emailTemplate.subjectFarsi, // Subject line
//                                                     //text: 'http://'+req.headers.host+'/reset-password?token='+token // html body
//                                                     html: htmldata
//                                                 }
//                                             }
//                                         }
//                                         mailer(mailOptions);
//                                         res.json({ success: true, msg: "Your password updated successfully!", type: "password update" });
//                                     });
//                                 }
//                             })
//                         });
//                     }
//                 });
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }




module.exports = {
    userRegister,
     login,
   
}