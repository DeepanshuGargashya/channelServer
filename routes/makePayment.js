const express = require("express");
const MakePaymentModel = require("../model/makePayment");
const AccountsModel = require("../model/accounts");
const router = express.Router();

router.post("/", [], async (req, res) => {
  var userExist = await AccountsModel.findOne({
    accNo: req.body.accountNumber,
  });
  if (userExist) {
    var channelPriceSum = 0;
    var channelList = [];
    req.body.channelList.map((item) => {
      channelPriceSum = channelPriceSum + parseFloat(item["PMRP"]);
      channelList = [...channelList, item["CHANNEL_NAME"]];
    });

    if (channelPriceSum === req.body.totalAmount) {
      await MakePaymentModel.create({
        accNo: req.body.accountNumber,
        channels: channelList,
      });
      var payload = {
        status: 200,
        data: "SuccessFully Recharged",
        message: "success",
      };
      res.send(payload);
    } else {
      var payload = {
        status: 404,
        data: "Amount Does not match",
        message: "fail",
      };
      res.send(payload);
    }
  } else {
    var payload = {
      status: 404,
      data: "user does not exist",
      message: "fail",
    };
    res.send(payload);
  }
});

module.exports = router;
