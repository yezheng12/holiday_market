// controllers/admin.controller.js

const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
    const { adminID, password } = req.body;

    try {
        // Check if the admin already exists
        let admin = await Admin.findOne({ adminID });
        if (admin) {
            return res.status(400).json({ message: "AdminID already exists" });
        }

        // Create a new admin
        admin = new Admin({ adminID, password });

        // Save the admin to the database
        await admin.save();

        // Generate a JWT token
        const payload = { admin: { id: admin.id, adminID: admin.adminID } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, adminId: admin.id, message: "Registration success!" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

const loginAdmin = async (req, res) => {
    const { adminID, password } = req.body;

    try {
        // Check if the admin exists
        let admin = await Admin.findOne({ adminID });
        if (!admin) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the password
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const payload = { admin: { id: admin.id, adminID: admin.adminID } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token, adminId: admin.id, message: "Login success!" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

module.exports = {
    registerAdmin,
    loginAdmin
};
