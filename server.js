require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Database connection

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/signup", require("./routes/signup")(db));
app.use("/api/login", require("./routes/login")(db));
app.use("/api/complaints", require("./routes/complaints")(db));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
