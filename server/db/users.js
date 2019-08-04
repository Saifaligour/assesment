let mongoose =  require( 'mongoose');

var Schema = mongoose.Schema;


var UserSchema = new Schema({
    userProfileId: { type: Schema.Types.ObjectId, ref: 'userEvent' },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number },
    countryCode: { type: Number },
    date: { type: Date, default: Date.now },
    reset_password_token: { type: String },
    smscode: { type: String },
    language: { type: String },
});

let User = mongoose.model('User', UserSchema);

module.exports = { User };

