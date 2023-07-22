const mongoose = require('mongoose');
const { Schema } = mongoose;

const LoginModel = new Schema({
    email: {
        type: String,
        
    },
    mobile: {
        type: String,
        
    }


});

const Login = mongoose.model('login', LoginModel);

module.exports = Login;
