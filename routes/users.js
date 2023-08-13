const express = require("express");
const router = express.Router();
const AccountsModel = require("../model/accounts");
const LoginModel = require("../model/loginModel");
const MakePaymentModel = require("../model/makePayment");

const fetchEachUserData = async (res) => {
  var eachData = [];

  for (let item in res) {
    var makePayment = await MakePaymentModel.findOne({
      accNo: res[item].accNo,
    });

    if (makePayment) {
      eachData.push({
        ...res[item]._doc,
        totalAmount: makePayment.totalAmount,
        channels: makePayment.channels,
      });
    } else {
      eachData.push({
        ...res[item]._doc,
        totalAmount: 0,
        channels: [],
      });
    }
  }
  return eachData;
};

router.get("/getUsers", [], async (req, res) => {
  try {
    var response = await AccountsModel.find();
    var getData = await fetchEachUserData(response);

    var payload = {
      status: 200,
      data: getData,
      message: "success",
    };
    res.send(payload);
  } catch (err) {
    console.log(err);
    var payload = {
      status: 402,
      data: "not found",
      message: "fail",
    };
    res.send(payload);
  }
});
router.get("/getAmbassadors", [], async (req, res) => {
  var payload = [];
  await LoginModel.find()
    .then((res) => {
      payload = {
        status: 200,
        data: res,
        message: "success",
      };
    })
    .catch((err) => {
      console.log(err);
      payload = {
        status: 402,
        data: "not found",
        message: "fail",
      };
    });
  res.send(payload);
});

module.exports = router;
