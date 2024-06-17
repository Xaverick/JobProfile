const nodemailer = require('nodemailer');

const MailSender = (to, subject, htmlContent, options = {}) => {
    return new Promise((resolve, reject) => {
        let config = {
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.PASSWORD}`
            }
        };
        // Create a Transporter to send emails
        let transporter = nodemailer.createTransport(config);

        const mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            html: htmlContent,
            ...options
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info.response);
            }
        });
    });
};

module.exports = MailSender;
