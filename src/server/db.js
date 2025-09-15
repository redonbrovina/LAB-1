// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shneta',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database pool created successfully');
    connection.release();
  } catch (err) {
    console.error('Failed to test database connection:', err);
    throw err;
  }
};

module.exports = connectDB;
module.exports.pool = pool; // për repositories
