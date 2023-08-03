const express = require("express");
const MakePaymentModel = require("../model/makePayment");
const AccountsModel = require("../model/accounts");
const router = express.Router();

router.get("/:ambId", [], async (req, res) => {
  //   var userExist = await AccountsModel.findOne({

  var makePaymentres = await MakePaymentModel.find({ ambId: req.params.ambId });
  var accountRes = await AccountsModel.find({ accNo: makePaymentres.accNo });
  var data = {
    accNo: accountRes.accNo,
    totalAmount: makePaymentres.totalAmount,
    ambId: makePaymentres.ambId,

    name: accountRes.name,
    mobile: accountRes.mobile,
    email: accountRes.email,
    channels: makePaymentres.channels,
  };
  var payload = {
    status: 200,
    data: data,
    message: "Success",
  };
  return payload;
});

module.exports = router;
