const Booking = require('../models/Booking');
const OTP = require('../models/OTP');
const Event = require('../models/Event');
const { sendOtpEmail,sendBookingEmail } = require('../utils/email');

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

