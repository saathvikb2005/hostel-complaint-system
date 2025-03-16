// server.js

const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

// Initialize Express app
const app = express();

// Use dotenv to load environment variables from .env file
dotenv.config();

// Middleware to serve static files (CSS, JS, images)
app.use(express.static('public'));

// Parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Export the db connection to be used in other files
module.exports = { db };

// Sample route: Home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');  // Serve the Home page (static)
});

// Sample route: Login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html'); // Serve the Login page (static)
});

// Sample route: Signup page
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html'); // Serve the Signup page (static)
});

// Start the server on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
