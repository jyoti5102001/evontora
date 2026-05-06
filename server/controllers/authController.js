const { act } = require('react');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const OTP = require('../models/OTP');
const { sendOtpEmail } = require('../utils/email');

const generateToken = (id,role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}
// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    let userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        const user = await User.create({ name, email, password: hashedPassword, role: 'user' ,isVerified: false});
        res.status(201).json({ message: "User registered successfully" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`OTP for ${email}: ${otp}`);
         await OTP.create({ email, otp, action: 'account_verification' });
        await sendOtpEmail(email, otp, 'account_verification');

        res.status(201).json({ message: "User registered successfully. Please check your email for OTP to verify your account.",
            email: user.email
         });
  
      
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credential Please Sign up first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified && user.role === 'user') {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.deleteMany({ email, action: 'account_verification' });  //remove old OTPs for this email and action
        await OTP.create({ email, otp, action: 'account_verification' });
        await sendOtpEmail(email, otp, 'account_verification'); 
        return res.status(400).json({
             error: "Account not verified. A new OTP has been sent to your email." });
    }
    res.json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
        token:
        
    })
};