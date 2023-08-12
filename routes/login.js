const LoginModel = require("../model/loginModel");
const AdminLoginModel = require("../model/adminLogin");
const OTPModel = require("../model/otpModel");
var nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

const sendMail = (subject, message, targetEmail) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "bhavusha590@gmail.com",
      pass: "nrsrmlmnknzzzjwb",
    },
  });

  var mailOptions = {
    from: "bhavusha590@gmail.com",
    to: targetEmail,
    subject: subject,

    html: "<p>Your login OTP is : </p>" + "<b>" + message + "</b>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// for Ambassador

router.post("/sendotp", [], async (req, res) => {
  //   const user = await Testcolumn.find(req.body.id)

  // res.json(user)
  if (req.body.email?.length > 3) {
    /// email case

    if (
      req.body.email.match(
        /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      )
    ) {
      // -- email find case
      console.log("inside match");
      const user = await LoginModel.findOne({ email: req.body.email });

      if (user === null) {
        var payload = {
          status: 404,
          data: "ambassador not found",
          message: "fail",
        };
        res.send(payload);
      } else {
        var val = Math.floor(1000 + Math.random() * 9000);
        await OTPModel.create({ ambId: user._id, otp: val });
        sendMail("your channel account OTP", val, user.email);
        console.log(user);
        var payload = {
          status: 200,
          data: user._id,
          message: "success",
        };
        res.send(payload);
      }
    } else {
      // not valid email case
      var payload = {
        status: 404,
        data: "enter valid email",
        message: "fail",
      };
      res.send(payload);
    }
  } else {
    // ____ mobile find case
    const user = await LoginModel.findOne({ mobile: req.body.mobile });
    console.log(user);
    // console.log(user.mobile);

    if (user !== null) {
      var val = Math.floor(1000 + Math.random() * 9000);
      await OTPModel.create({ ambId: user._id, otp: val });
      sendMail("your channel account OTP", val, user.email);

      var payload = {
        status: 200,
        data: user._id,
        message: "success",
      };
      res.send(payload);
    } else {
      var payload = {
        status: 404,
        data: "ambassador not found",
        message: "fail",
      };
      res.send(payload);
    }
  }
});
router.post("/verifyotp", [], async (req, res) => {
  var user;
  try {
    user = await LoginModel.findOne({ _id: req.body.id });
  } catch (e) {
    console.log(e);
  }
  var validOtp = await OTPModel.findOne({
    ambId: req.body.id,
    otp: req.body.otp,
  });
  console.log(user);
  if (user !== null && validOtp !== null && req.body.otp === validOtp?.otp) {
    await OTPModel.deleteOne({ ambId: req.body.id, otp: req.body.otp });
    var payload = {
      status: 200,
      data: user,
      message: "success",
    };
    res.send(payload);
  } else {
    var payload = {
      status: 404,
      data: "Enter valid credentials",
      message: "fail",
    };
    res.send(payload);
  }
});

// for Admin Panel

router.post("/admin/sendotp", [], async (req, res) => {
  //   const user = await Testcolumn.find(req.body.id)

  // res.json(user)
  if (req.body.email?.length > 3) {
    /// email case

    if (
      req.body.email.match(
        /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      )
    ) {
      // -- email find case
      console.log("inside match");
      const user = await AdminLoginModel.findOne({ email: req.body.email });

      if (user === null) {
        var payload = {
          status: 404,
          data: "admin not found",
          message: "fail",
        };
        res.send(payload);
      } else {
        var val = Math.floor(1000 + Math.random() * 9000);
        await OTPModel.create({ adminId: user._id, otp: val });
        sendMail("your channel account OTP", val, user.email);
        console.log(user);
        var payload = {
          status: 200,
          data: user._id,
          message: "success",
        };
        res.send(payload);
      }
    } else {
      // not valid email case
      var payload = {
        status: 404,
        data: "enter valid email",
        message: "fail",
      };
      res.send(payload);
    }
  } else {
    // ____ mobile find case
    const user = await AdminLoginModel.findOne({ mobile: req.body.mobile });
    console.log(user);
    // console.log(user.mobile);

    if (user !== null) {
      var val = Math.floor(1000 + Math.random() * 9000);
      await OTPModel.create({ adminId: user._id, otp: val });
      sendMail("your channel account OTP", val, user.email);

      var payload = {
        status: 200,
        data: user._id,
        message: "success",
      };
      res.send(payload);
    } else {
      var payload = {
        status: 404,
        data: "Admin not found",
        message: "fail",
      };
      res.send(payload);
    }
  }
});
router.post("/admin/verifyotp", [], async (req, res) => {
  var user;
  try {
    user = await AdminLoginModel.findOne({ _id: req.body.id });
  } catch (e) {
    console.log(e);
  }
  var validOtp = await OTPModel.findOne({
    adminId: req.body.id,
    otp: req.body.otp,
  });
  console.log(user);
  if (user !== null && validOtp !== null && req.body.otp === validOtp?.otp) {
    await OTPModel.deleteOne({ adminId: req.body.id, otp: req.body.otp });
    var payload = {
      status: 200,
      data: user,
      message: "success",
    };
    res.send(payload);
  } else {
    var payload = {
      status: 404,
      data: "Enter valid credentials",
      message: "fail",
    };
    res.send(payload);
  }
});

module.exports = router;
