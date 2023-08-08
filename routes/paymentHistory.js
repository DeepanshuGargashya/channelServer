const express = require("express");
const MakePaymentModel = require("../model/makePayment");
const AccountsModel = require("../model/accounts");
const router = express.Router();

router.get("/:ambId", [], async (req, res) => {
  //   var userExist = await AccountsModel.findOne({

  var sendPayload = [];
  console.log(req.params.ambId);
  var makePaymentres = await MakePaymentModel.find({ ambId: req.params.ambId });

  for (let i = 0; i < makePaymentres.length; i++) {
    var accountRes = await AccountsModel.findOne({
      accNo: makePaymentres[i].accNo,
    });

    var addDetail = {
      accNo: accountRes.accNo,
      totalAmount: makePaymentres[i].totalAmount,
      ambId: makePaymentres[i].ambId,

      name: accountRes.name,
      mobile: accountRes.mobile,
      email: accountRes.email,
      channels: makePaymentres[i].channels,
    };
    sendPayload = [...sendPayload, addDetail];
  }

  // console.log("data");
  // console.log(data);
  var payload = {
    status: 200,
    data: sendPayload,
    message: "Success",
  };

  res.send(payload);
});

module.exports = router;
