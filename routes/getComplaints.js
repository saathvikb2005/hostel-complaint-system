
const express = require('express');
const Complaint = require('../models/complaint');
const router = express.Router();

router.get('/admin/complaints', (req, res) => {
    Complaint.getAll((err, complaints) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(complaints);
    });
});

module.exports = router;
