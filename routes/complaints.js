// const express = require("express");
// const router = express.Router();

// module.exports = (db) => {
//     // Get all complaints
//     router.get("/", async (req, res) => {
//       try {
//           const query = "SELECT id, title, description, category, room_number AS roomNumber, status, user_id AS userId FROM complaints";
//           const [complaints] = await db.execute(query);
  
//           console.log("Fetched complaints:", complaints); // Debugging log
  
//           res.json(complaints);
//       } catch (error) {
//           console.error("Error fetching complaints:", error);
//           res.status(500).json({ success: false, message: "Database error", error: error.message });
//       }
//   });
  

//     // Add a new complaint
//     router.post("/", async (req, res) => {
//       try {
//           const { title, description, category, roomNumber, userId } = req.body;
  
//           console.log("Received complaint data:", req.body); // Debugging log
  
//           if (!title || !description || !category || !roomNumber || !userId) {
//               return res.status(400).json({ success: false, message: "All fields are required" });
//           }
  
//           const query = `
//               INSERT INTO complaints (title, description, category, room_number, status, user_id) 
//               VALUES (?, ?, ?, ?, 'Pending', ?)
//           `;
//           const values = [title, description, category, roomNumber, userId];
  
//           console.log("Executing query:", query, values); // Debugging log
  
//           const [result] = await db.execute(query, values);
  
//           console.log("Complaint inserted, new ID:", result.insertId); // Debugging log
  
//           res.status(201).json({ success: true, message: "Complaint submitted successfully!" });
//       } catch (error) {
//           console.error("Complaint submission error:", error); // Log full error
//           res.status(500).json({ success: false, message: "Database error", error: error.message });
//       }
//   });
  

//     // Resolve complaint
//     router.patch("/resolve/:id", async (req, res) => {
//         const complaintId = parseInt(req.params.id);
//         try {
//             const result = await db.query(
//                 "UPDATE complaints SET status = 'Resolved' WHERE id = $1 RETURNING *",
//                 [complaintId]
//             );

//             if (result.rowCount === 0) {
//                 return res.status(404).json({ success: false, message: "Complaint not found" });
//             }

//             res.json({ success: true, message: "Complaint resolved successfully", complaint: result.rows[0] });
//         } catch (error) {
//             console.error("Database error:", error);
//             res.status(500).json({ success: false, message: "Database error" });
//         }
//     });

//     // Delete complaint
//     router.delete("/delete/:id", async (req, res) => {
//         const complaintId = parseInt(req.params.id);
//         try {
//             const result = await db.query("DELETE FROM complaints WHERE id = $1", [complaintId]);

//             if (result.rowCount === 0) {
//                 return res.status(404).json({ success: false, message: "Complaint not found" });
//             }

//             res.json({ success: true, message: "Complaint deleted successfully" });
//         } catch (error) {
//             console.error("Database error:", error);
//             res.status(500).json({ success: false, message: "Database error" });
//         }
//     });

//     return router;
// };

const express = require("express");
const router = express.Router();

module.exports = (db) => {
    // Get all complaints
    router.get("/", async (req, res) => {
        try {
            const query = "SELECT id, title, description, category, room_number AS roomNumber, status, user_id AS userId FROM complaints";
            const [complaints] = await db.execute(query);

            console.log("Fetched complaints:", complaints); // Debugging log

            res.json(complaints);
        } catch (error) {
            console.error("Error fetching complaints:", error);
            res.status(500).json({ success: false, message: "Database error", error: error.message });
        }
    });

    // Add a new complaint
    router.post("/", async (req, res) => {
        try {
            const { title, description, category, roomNumber, userId } = req.body;

            console.log("Received complaint data:", req.body); // Debugging log

            if (!title || !description || !category || !roomNumber || !userId) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const query = `
                INSERT INTO complaints (title, description, category, room_number, status, user_id) 
                VALUES (?, ?, ?, ?, 'Pending', ?)
            `;
            const values = [title, description, category, roomNumber, userId];

            console.log("Executing query:", query, values); // Debugging log

            const [result] = await db.execute(query, values);

            console.log("Complaint inserted, new ID:", result.insertId); // Debugging log

            res.status(201).json({ success: true, message: "Complaint submitted successfully!" });
        } catch (error) {
            console.error("Complaint submission error:", error); // Log full error
            res.status(500).json({ success: false, message: "Database error", error: error.message });
        }
    });

    // Resolve complaint (FIXED)
    router.patch("/resolve/:id", async (req, res) => {
        const complaintId = parseInt(req.params.id);
        try {
            await db.execute(
                "UPDATE complaints SET status = 'Resolved' WHERE id = ?",
                [complaintId]
            );

            // Fetch updated complaint
            const [updatedComplaint] = await db.execute("SELECT * FROM complaints WHERE id = ?", [complaintId]);

            if (updatedComplaint.length === 0) {
                return res.status(404).json({ success: false, message: "Complaint not found" });
            }

            res.json({ success: true, message: "Complaint resolved successfully", complaint: updatedComplaint[0] });
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ success: false, message: "Database error" });
        }
    });

    // Delete complaint (FIXED)
    router.delete("/delete/:id", async (req, res) => {
        const complaintId = parseInt(req.params.id);
        try {
            const [result] = await db.execute("DELETE FROM complaints WHERE id = ?", [complaintId]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: "Complaint not found" });
            }

            res.json({ success: true, message: "Complaint deleted successfully" });
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ success: false, message: "Database error" });
        }
    });

    return router;
};
