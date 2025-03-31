// const express = require("express");
// const router = express.Router();

// module.exports = (db) => {
//     // Fetch all contacts
//     router.get("/", (req, res) => {
//         db.query("SELECT * FROM contacts", (err, results) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.json(results);
//         });
//     });

//     // Add a new contact (Admin only)
//     router.post("/", (req, res) => {
//         const { name, phone, email } = req.body;
//         if (!name || !phone || !email) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         db.query("INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)", 
//             [name, phone, email], 
//             (err, result) => {
//                 if (err) {
//                     return res.status(500).json({ error: err.message });
//                 }
//                 res.json({ message: "Contact added successfully", id: result.insertId });
//             }
//         );
//     });

//     return router;
// };


const express = require("express");
const router = express.Router();

module.exports = (db) => {
    // ✅ Get all contacts (async/await version)
    router.get("/", async (req, res) => {
        try {
            const [results] = await db.query("SELECT * FROM contacts");
            res.json(results);
        } catch (err) {
            console.error("Database Error:", err);
            res.status(500).json({ error: err.message });
        }
    });

    // ✅ Add a new contact
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

    // ✅ Update a contact
    router.put("/:id", async (req, res) => {
        const { name, phone, email } = req.body;
        const contactId = req.params.id;

        if (!name || !phone || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            await db.query(
                "UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?",
                [name, phone, email, contactId]
            );
            res.json({ message: "Contact updated successfully" });
        } catch (err) {
            console.error("Database Update Error:", err);
            res.status(500).json({ error: err.message });
        }
    });

    // ✅ Delete a contact
    router.delete("/:id", async (req, res) => {
        const contactId = req.params.id;

        try {
            await db.query("DELETE FROM contacts WHERE id = ?", [contactId]);
            res.json({ message: "Contact deleted successfully" });
        } catch (err) {
            console.error("Database Delete Error:", err);
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};
