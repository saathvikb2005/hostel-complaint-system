
const db = require('./db');

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
