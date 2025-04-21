let db; 


const setDb = (databaseConnection) => {
  db = databaseConnection; 
};

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
      callback(null, result[0]); 
    });
  },
};

module.exports = { User, setDb };
