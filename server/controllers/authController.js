const User = require('../models/User');
const bcrypt = require('bcryptjs');
const OTP = require('../models/OTP');
const { sendOtpEmail } = require('../utils/email');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// ================= REGISTER USER =================
const registerUser = async (req, res) => {

    try {

        console.log("Register User Called");

        const { name, email, password } = req.body;

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check existing user
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword =
            await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            isVerified: false
        });

        console.log("User Created:", user.email);

        // Generate OTP
        const otp =
            Math.floor(100000 + Math.random() * 900000)
            .toString();

        console.log("Generated OTP:", otp);

        // Delete previous OTPs
        await OTP.deleteMany({
            email,
            action: 'account_verification'
        });

        // Save OTP
        const savedOtp = await OTP.create({
            email,
            otp,
            action: 'account_verification'
        });

        console.log("OTP Saved Successfully");
        console.log(savedOtp);

        // Send Email
        await sendOtpEmail(
            email,
            otp,
            'account_verification'
        );

        // Success response
        return res.status(201).json({
            success: true,
            message:
                "User registered successfully. OTP sent to email.",
            email: user.email
        });

    } catch (error) {

        console.log("REGISTER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ================= LOGIN USER =================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Compare password
        const isMatch =
            await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Check verification
        if (!user.isVerified &&
            user.role === 'user') {

            const otp =
                Math.floor(100000 + Math.random() * 900000)
                .toString();

            // Delete old OTPs
            await OTP.deleteMany({
                email,
                action: 'account_verification'
            });

            // Save OTP
            await OTP.create({
                email,
                otp,
                action: 'account_verification'
            });

            // Send email
            await sendOtpEmail(
                email,
                otp,
                'account_verification'
            );

            return res.status(400).json({
                success: false,
                message:
                    "Account not verified. OTP sent again."
            });
        }

        // Login Success
        return res.status(200).json({
            success: true,
            message: "Login successful",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });

    } catch (error) {

        console.log("LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ================= VERIFY OTP =================
const verifyOtp = async (req, res) => {

    try {

        const { email, otp } = req.body;

        // Find OTP
        const otpRecord = await OTP.findOne({
            email,
            otp,
            action: 'account_verification'
        });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        // Verify User
        const user = await User.findOneAndUpdate(
            { email },
            { isVerified: true },
            { new: true }
        );

        // Delete OTP
        await OTP.deleteMany({
            email,
            action: 'account_verification'
        });

        // Success Response
        return res.status(200).json({
            success: true,
            message: "Account verified successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });

    } catch (error) {

        console.log("VERIFY OTP ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Export
module.exports = {
    registerUser,
    loginUser,
    verifyOtp
};