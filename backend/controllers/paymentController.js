const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const crypto = require('crypto');
const profileModel = require('../models/profileModel');
const ExpressError = require('../utils/ExpressError.js');
const uploadOnCloudinary = require('../utils/cloudinary');
const MailSender = require('../utils/MailSender');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const Invoice = require('../models/invoiceModel');
const userPlanStatus = require('../models/userPlanStatus');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  
module.exports.createOrder = async (req, res) => {

    let {amount} = req.body;
    const user = await User.findById(req.userId);
    if(!user) {
        throw new ExpressError("User not found", 400);
    }


    if(!amount) {
        throw new ExpressError("Amount is required", 400);
    }
    
    const options = {
    //   amount: amount * 100, // amount in smallest currency unit
      amount: amount * 1, // amount in smallest currency unit
      currency: 'INR',
      receipt: uuidv4(),
    };

    const order = await razorpay.orders.create(options);    
    res.json({ order: order });
};


module.exports.verify = async (req, res) => {
  const { response, plan } = req.body;
  const userId = req.userId;
  const user = await User.findById(userId);
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);

  hmac.update(response.razorpay_order_id + "|" + response.razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === response.razorpay_signature) {

      const userPlan = await userPlanStatus.create({
        userId: user._id,
        plan: plan,
        expiryDate: new Date(Date.now() + plan.validity * 24 * 60 * 60 * 1000),
      })


      user.currentPlan.push(userPlan._id);   
    
      await user.save();

      // Ensure the invoices directory exists
      const invoicesDir = path.join(__dirname, '../invoices');

      if (!fs.existsSync(invoicesDir)) {
          fs.mkdirSync(invoicesDir);
      }

      // Create Invoice PDF
      const doc = new PDFDocument();
      const invoiceId = uuidv4();
      const invoicePath = path.join(invoicesDir, `invoice-${invoiceId}.pdf`);
      doc.pipe(fs.createWriteStream(invoicePath));

      doc.fontSize(25).text('Invoice', {
          align: 'center'
      });

      doc.moveDown();
      doc.fontSize(16).text(`Invoice ID: ${invoiceId}`);
      doc.text(`Order ID: ${response.razorpay_order_id}`);
      doc.text(`Payment ID: ${response.razorpay_payment_id}`);
      doc.text(`User ID: ${user._id}`);
      doc.text(`Plan: ${plan.title}`);
      doc.text(`Amount: ₹${plan.price}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      
      doc.moveDown();
      doc.text(`Thank you for your purchase!`);

      doc.end();

      // Save invoice details in the database
      const invoice = new Invoice({
          user: user._id,
          plan: plan.title,
          amount: plan.price,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          expiryDate: new Date(Date.now() + plan.validity * 24 * 60 * 60 * 1000) // 90 days
      });

      await invoice.save();

      // Send Email with Invoice
      const sending = await MailSender(user.email, "Order Summary", 
      `<p>Dear ${user.name},</p>
      <p>Thank you for purchasing our ${plan.title} plan.</p>
      <p>Attached is your invoice for your records.</p>
      <p>Order Details:</p>
      <ul>
        <li>Invoice ID: ${invoiceId}</li>
        <li>Order ID: ${response.razorpay_order_id}</li>
        <li>Payment ID: ${response.razorpay_payment_id}</li>
        <li>Plan: ${plan.title}</li>
        <li>Amount: ₹${plan.price}</li>
        <li>Date: ${new Date().toLocaleDateString()}</li>
      </ul>
      <p>Thank you for your purchase!</p>`, {
          attachments: [{
              filename: `invoice-${invoiceId}.pdf`,
              path: invoicePath
          }]
      });
      
      // Remove local invoice file after sending email
      if(sending)
        fs.unlinkSync(invoicePath);

      res.status(200).send('Payment verified successfully.');
  } else {
      res.status(400).send('Payment verification failed.');
  }
};