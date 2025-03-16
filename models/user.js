let db; // Declare the db connection

// Function to set the db connection
const setDb = (databaseConnection) => {
  db = databaseConnection; // Assign the passed db connection to the model
};

// Create a User model for database operations
const User = {
  create: (userData, callback) => {
    const { username, email, password, role } = userData;
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    db.query(query, [username, email, password, role], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },

  getByEmail: (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], (err, result) => {
      if (err) return callback(err);
      callback(null, result[0]); // Assuming only one result
    });
  },
};

// Export the User object and setDb function
module.exports = { User, setDb };
