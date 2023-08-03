const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentHistoryModel = new Schema({
  accNo: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  ambId: {
    type: Schema.Types.ObjectId,
  },

  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
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

const PaymentHistory = mongoose.model("paymentHistory", PaymentHistoryModel);

module.exports = PaymentHistory;
