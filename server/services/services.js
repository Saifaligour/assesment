let jwt =  require( 'jsonwebtoken');
let { JWTSecret } =  require( '../config/config');
let bcrypt = require ('bcrypt');

let JwtSign = (payload, cb) => {

    jwt.sign(payload, JWTSecret, { expiresIn: '1d' }, cb);
}


let comparePassword = (password, payload) => {
    try {
        return bcrypt.compareSync(password, payload);
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    JwtSign,
    comparePassword
}