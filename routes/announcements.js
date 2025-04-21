const express = require("express");
const router = express.Router();

module.exports = (db) => {

    router.get("/", async (req, res) => {
        try {
            const [announcements] = await db.query("SELECT * FROM announcements ORDER BY created_at DESC");
            res.json(announcements);
        } catch (error) {
            console.error("Error fetching announcements:", error);
            res.status(500).json({ message: "Server error" });
        }
    });


    router.post("/add", async (req, res) => {
        const { title, message } = req.body;
        if (!title || !message) {
            return res.status(400).json({ message: "Title and message are required" });
        }

        try {
            await db.query("INSERT INTO announcements (title, message) VALUES (?, ?)", [title, message]);
            res.json({ message: "Announcement added successfully!" });
        } catch (error) {
            console.error("Error adding announcement:", error);
            res.status(500).json({ message: "Server error" });
        }
    });

    
    router.delete("/delete/:id", async (req, res) => {
        const { id } = req.params;
        try {
            await db.query("DELETE FROM announcements WHERE id = ?", [id]);
            res.json({ message: "Announcement deleted successfully!" });
        } catch (error) {
            console.error("Error deleting announcement:", error);
            res.status(500).json({ message: "Server error" });
        }
    });

    return router;
};
