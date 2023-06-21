'use strict'
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
app.use(require("body-parser").json());
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

var instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

const path = require("path")


const renderProduct = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/standard.html'));

};

const createOrder = (req, res) => {
  console.log("create orderId request", req.body);
  var options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "rcp1",
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    console.log(order.id);
    res.send({ orderId: order.id });
  });

};


const verify = (req, res) => {

  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
  

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);

  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.response.razorpay_signature) {
    response = { signatureIsValid: "true" };
    res.send(response);
  }
};



module.exports = { renderProduct, createOrder, verify };