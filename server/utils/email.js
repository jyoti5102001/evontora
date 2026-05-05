const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
const e = require('cors');
const OTP = require('../models/OTP');
dotenv.config();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendOtpEmail = async(email, otp, type) => {
  try { 
     const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email} for ${type}`);
    
} catch (error) {
    console.error(`Error sending OTP email to ${email} for ${type}:`, error);
   
}
};