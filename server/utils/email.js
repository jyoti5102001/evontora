const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
const OTP = require('../models/OTP');
dotenv.config();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendOtpEmail = async (email, otp, type) => {
  try { 
    const title = type === 'account_verification' 
      ? 'Verify your Eventora Account' 
      : 'Eventora Booking Verification';

    const msg = type === 'account_verification' 
      ? 'Please use the following OTP to verify your Eventora account:' 
      : 'Please use the following OTP to reset your Eventora password:';

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: title,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; text-align: center;">
              
              <h2 style="color: #333;">${title}</h2>
              
              <p style="color: #555; font-size: 16px;">
                ${msg}
              </p>

              <div style="margin: 20px 0;">
                <span style="display: inline-block; font-size: 28px; letter-spacing: 5px; font-weight: bold; color: #2c3e50;">
                  ${otp}
                </span>
              </div>

              <p style="color: #888; font-size: 14px;">
                This OTP is valid for a limited time. Do not share it with anyone.
              </p>

              <hr style="margin: 20px 0;" />

              <p style="font-size: 12px; color: #aaa;">
                © ${new Date().getFullYear()} Eventora. All rights reserved.
              </p>

            </div>
          </div>
        `
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email} for ${type}`);
    
  } catch (error) {
    console.error(`Error sending OTP email to ${email} for ${type}:`, error);
  }
};