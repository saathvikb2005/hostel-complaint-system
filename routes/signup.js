const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
    const router = express.Router();

    router.post("/", async (req, res) => {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ message: "⚠️ All fields are required." });
            }

            // Check if user already exists
            const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
            if (existingUsers.length > 0) {
                return res.status(409).json({ message: "❌ Email already in use." });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user
            const query = `
                INSERT INTO users (username, email, password, role) 
                VALUES (?, ?, ?, 'user')
            `;
            await db.query(query, [username, email, hashedPassword]);

            res.status(201).json({ message: "✅ Signup successful!" });
        } catch (error) {
            console.error("❌ Signup Error:", error);
            res.status(500).json({ message: "❌ Something went wrong. Please try again." });
        }
    });

    return router;
};
