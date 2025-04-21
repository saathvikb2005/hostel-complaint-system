const express = require("express");
const router = express.Router();

module.exports = (db) => {
    //  Get all contacts
    router.get("/", async (req, res) => {
        try {
            const [results] = await db.query("SELECT * FROM contacts");
            res.json(results);
        } catch (err) {
            console.error("Database Error:", err);
            res.status(500).json({ error: err.message });
        }
    });

    // Add a new contact
    router.post("/", async (req, res) => {
        const { name, phone, email } = req.body;

        if (!name || !phone || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const [result] = await db.query(
                "INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)",
                [name, phone, email]
            );
            res.json({ message: "Contact added successfully", id: result.insertId });
        } catch (err) {
            console.error("Database Insert Error:", err);
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};
