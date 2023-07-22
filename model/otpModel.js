const mongoose = require("mongoose");
const { Schema } = mongoose;

const OTPModel = new Schema({
  ambId: {
    type: Schema.Types.ObjectId,
  },
  otp: {
    type: String,
  },
});

const OTP = mongoose.model("OTP", OTPModel);

module.exports = OTP;
