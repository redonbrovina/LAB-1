const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Shneta',
    waitForConnections: true,
    connectionLimit: 10,
})

pool.getConnection((err, connection)=> {
    if(err) {
        console.log('Error connecting to the database', err)
        return;
    }

    console.log('Successfully connected to the database!')
    connection.release();
})

module.exports = pool;