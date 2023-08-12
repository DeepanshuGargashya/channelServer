const express = require("express");
const router = express.Router();
const ContactModel = require("../model/contactModel");

router.post("/", [], async (req, res) => {
  try {
    await ContactModel.create(req.body);

    var payload = {
      status: 200,
      data: "Successfully added",
      message: "Success",
    };

    res.send(payload);
  } catch (e) {
    var payload = {
      status: 402,
      data: "Something went wrong",
      message: "fail",
    };

    res.send(payload);
  }
  router.get("/admin", [], async (req, res) => {
    var payload = [];
    await ContactModel.find()
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
});

module.exports = router;
