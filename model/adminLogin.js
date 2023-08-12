const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminLoginModel = new Schema({
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
});

const AdminLogin = mongoose.model("adminLogin", AdminLoginModel);

module.exports = AdminLogin;
