
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require("express");
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://jyotidev:Jyoti12345@cluster0.7bht3co.mongodb.net/eventora")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Model
const User = mongoose.model("User", userSchema);

// GET API (fetch all users)
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
