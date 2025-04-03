const mysql = require("mysql2/promise");
require("dotenv").config(); 

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "fixmystay_db",
});

db.getConnection()
    .then(() => console.log("✅ MySQL is connected successfully!"))
    .catch((err) => console.error("❌ MySQL connection error:", err.message));

module.exports = db;
