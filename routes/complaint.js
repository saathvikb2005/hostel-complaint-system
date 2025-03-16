const express = require('express');
const { Complaint, setDb } = require('../models/complaint');
const router = express.Router();

// Route to create a new complaint
router.post('/complaint', (req, res) => {
    const { userId, title, description, category, roomNumber, status } = req.body;

    if (!userId || !title || !description || !category || !roomNumber) {
        return res.status(400).send("All fields are required.");
    }

    Complaint.create({ userId, title, description, category, roomNumber, status }, (err, result) => {
        if (err) return res.status(500).send("Error creating complaint");
        res.status(201).send("Complaint filed successfully!");
    });
});

// Route to get all complaints
router.get('/complaints', (req, res) => {
    Complaint.getAll((err, result) => {
        if (err) return res.status(500).send("Error fetching complaints");
        res.status(200).json(result);
    });
});

module.exports = (db) => {
    setDb(db); // Pass the db to the model
    return router;
};
