const mongoose = require("mongoose");
const { Schema } = mongoose;

const MakePaymentModel = new Schema({
  accNo: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  ambId: {
    type: Schema.Types.ObjectId,
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
