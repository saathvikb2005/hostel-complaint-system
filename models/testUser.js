// models/testUser.js
const db = require('./db'); // Make sure to import the db connection

db.query(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
    ['John Doe', 'johndoe@example.com', 'securepassword', 'user'], 
    (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err);
        } else {
            console.log('Data inserted successfully: ', result);
        }
    }
);
