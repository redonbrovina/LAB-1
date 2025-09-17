const mysql = require('mysql2')

class Database {
    #pool;

    constructor() {
        try {
            this.#pool = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'shneta',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            
            console.log('Database pool created successfully');
            
            // Test connection async
            this.testConnection().catch(err => {
                console.error('Failed to test database connection:', err.message);
            });
        } catch (error) {
            console.error('Failed to create database pool:', error.message);
            this.#pool = null;
        }
    }

    async testConnection() {
        return new Promise((resolve, reject) => {
            this.#pool.query('SELECT 1', (err, results) => {
                if (err) {
                    console.error('Database connection failed:', err.message);
                    reject(new Error(`Unable to connect to database: ${err.message}`));
                } else {
                    console.log('Database connection successful');
                    resolve(true);
                }
            });
        });
    }

    async query(sql, params=[]){
        return new Promise((resolve, reject) => {
            // Check if pool is initialized
            if (!this.#pool) {
                reject(new Error('Database pool not initialized'));
                return;
            }

            this.#pool.query(sql, params, (err, results) => {
                if (err) {
                    reject(new Error(`Database query failed: ${err.message}`));
                } else {
                    resolve(results);
                }
            });
        });
    }

    async close(){
        try{
            await this.#pool.end()
            console.log('Database connection pool closed.')
        } catch(err){
            console.error(`Error closing database connection pool: ${err.message}`)
            throw err;
        }
    }
}

const database = new Database();
Object.freeze(database);

module.exports = database;
