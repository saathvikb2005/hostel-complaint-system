const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
    const router = express.Router();

    router.post("/", async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        try {
            const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

            if (users.length === 0) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            const user = users[0];

            console.log("🔍 Database Password:", user.password);
            console.log("🔍 Entered Password:", password);

            // Compare hashed passwords (if stored hashed)
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                console.log("❌ Password does not match");
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            console.log("✅ Password matched!");

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.json({ success: true, message: "Login successful", token, user });
        } catch (error) {
            console.error("❌ Login Error:", error);
            res.status(500).json({ success: false, message: "Database error" });
        }
    });

    return router;
};
