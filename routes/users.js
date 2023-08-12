const express = require("express");
const router = express.Router();
const AccountsModel = require("../model/accounts");
const LoginModel = require("../model/loginModel");

router.get("/getUsers", [], async (req, res) => {
  var payload = [];
  await AccountsModel.find()
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
