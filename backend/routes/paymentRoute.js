const router = require('express').Router();
const catchAsync = require("../utils/catchAsync");
const payment = require("../controllers/paymentController");
const {isUser} = require("../middleware");



router.route('/create-order')
    .post(isUser, catchAsync(payment.createOrder));
  
router.route('/verify')
    .post(isUser, catchAsync(payment.verify));
  

module.exports = router