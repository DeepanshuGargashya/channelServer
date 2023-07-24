const mongoose = require("mongoose");
const { Schema } = mongoose;

const MakePaymentModel = new Schema({
  accNo: {
    type: String,
  },

  channels: {
    type: [
      {
        type: String,
        ref: "channel",
      },
    ],
  },
});

const MakePayment = mongoose.model("makePayment", MakePaymentModel);

module.exports = MakePayment;
