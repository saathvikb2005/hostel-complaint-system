const db = require('./db');

const Complaint = {
  create: (user_id, title, description, callback) => {
    const sql = "INSERT INTO complaints (user_id, title, description) VALUES (?, ?, ?)";
    db.query(sql, [user_id, title, description], callback);
  },

  getAll: (callback) => {
    const sql = "SELECT complaints.*, users.name AS user_name FROM complaints JOIN users ON complaints.user_id = users.id";
    db.query(sql, callback);
  },

  updateStatus: (id, status, callback) => {
    const sql = "UPDATE complaints SET status = ? WHERE id = ?";
    db.query(sql, [status, id], callback);
  }
};

module.exports = Complaint;
