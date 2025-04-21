let db;

const setDb = (databaseConnection) => {
    db = databaseConnection;
};


const Complaint = {
    create: async (complaintData) => {
        let { userId, title, description, category, roomNumber, status } = complaintData;

        category = category || 'General'; 
        roomNumber = roomNumber || 'Unknown';  

        if (!db) {
            console.error("❌ Error: Database connection is not established.");
            throw new Error("Database connection is not established.");
        }

        try {
            const query = `
                INSERT INTO complaints (user_id, title, description, category, room_number, status)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const [result] = await db.query(query, [userId, title, description, category, roomNumber, status]);
            console.log("✅ Complaint inserted successfully:", result);
            return result;
        } catch (error) {
            console.error("❌ Error inserting complaint:", error);
            throw error;
        }
    },

    getAll: async () => {
        if (!db) {
            console.error("❌ Error: Database connection is not established.");
            throw new Error("Database connection is not established.");
        }

        try {
            const sql = "SELECT complaints.*, users.name AS user_name FROM complaints JOIN users ON complaints.user_id = users.id";
            const [rows] = await db.query(sql);
            console.log("📄 Retrieved complaints:", rows);
            return rows;
        } catch (error) {
            console.error("❌ Error fetching complaints:", error);
            throw error;
        }
    },
};

module.exports = { Complaint, setDb };
