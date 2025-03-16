const db = require('./db');

const User = {
  create: (name, email, password, role, callback) => {
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, password, role], callback);
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  }
};

module.exports = User;
