const mongoose = require("mongoose");
const { Schema } = mongoose;

const AccountsModel = new Schema({
  accNo: {
    type: String,
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
});

const Accounts = mongoose.model("accounts", AccountsModel);

module.exports = Accounts;
