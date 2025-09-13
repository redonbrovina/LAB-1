const database = require('../database/Database');

/**
 * BaseModel - A base class for all database models
 * Provides common CRUD operations and database interaction methods
 */
class BaseModel {
    constructor(tableName, primaryKey = 'id') {
        this.tableName = tableName;
        this.primaryKey = primaryKey;
    }

    /**
     * Execute a raw SQL query
     * @param {string} query - SQL query string
     * @param {Array} params - Query parameters
     * @returns {Promise} - Query result
     */
    async query(query, params = []) {
        return await database.query(query, params);
    }

    /**
     * Find all records from the table
     * @param {Object} options - Query options (limit, offset, orderBy, where)
     * @returns {Promise<Array>} - Array of records
     */
    async findAll(options = {}) {
        let query = `SELECT * FROM ${this.tableName}`;
        const params = [];

        if (options.where) {
            const whereClause = this.buildWhereClause(options.where);
            query += ` WHERE ${whereClause.clause}`;
            params.push(...whereClause.params);
        }

        if (options.orderBy) {
            query += ` ORDER BY ${options.orderBy}`;
        }

        if (options.limit) {
            query += ` LIMIT ${options.limit}`;
            if (options.offset) {
                query += ` OFFSET ${options.offset}`;
            }
        }

        return await this.query(query, params);
    }

    /**
     * Find a single record by ID
     * @param {number|string} id - Primary key value
     * @returns {Promise<Object|null>} - Record or null if not found
     */
    async findById(id) {
        const query = `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
        const results = await this.query(query, [id]);
        return results.length > 0 ? results[0] : null;
    }

    /**
     * Find records by specific field value
     * @param {string} field - Field name
     * @param {any} value - Field value
     * @returns {Promise<Array>} - Array of matching records
     */
    async findByField(field, value) {
        const query = `SELECT * FROM ${this.tableName} WHERE ${field} = ?`;
        return await this.query(query, [value]);
    }

    /**
     * Find a single record by specific field value
     * @param {string} field - Field name
     * @param {any} value - Field value
     * @returns {Promise<Object|null>} - Record or null if not found
     */
    async findOneByField(field, value) {
        const results = await this.findByField(field, value);
        return results.length > 0 ? results[0] : null;
    }

    /**
     * Create a new record
     * @param {Object} data - Data to insert
     * @returns {Promise<Object>} - Created record with generated ID
     */
    async create(data) {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const placeholders = fields.map(() => '?').join(', ');

        const query = `INSERT INTO ${this.tableName} (${fields.join(', ')}) VALUES (${placeholders})`;
        const result = await this.query(query, values);
        
        const createdId = result.insertId;
        return await this.findById(createdId);
    }

    /**
     * Update a record by ID
     * @param {number|string} id - Primary key value
     * @param {Object} data - Data to update
     * @returns {Promise<Object|null>} - Updated record or null if not found
     */
    async updateById(id, data) {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const setClause = fields.map(field => `${field} = ?`).join(', ');

        const query = `UPDATE ${this.tableName} SET ${setClause} WHERE ${this.primaryKey} = ?`;
        const result = await this.query(query, [...values, id]);
        
        if (result.affectedRows === 0) {
            return null;
        }
        
        return await this.findById(id);
    }

    /**
     * Update records by specific field value
     * @param {string} field - Field name
     * @param {any} value - Field value
     * @param {Object} data - Data to update
     * @returns {Promise<number>} - Number of affected rows
     */
    async updateByField(field, value, data) {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const setClause = fields.map(field => `${field} = ?`).join(', ');

        const query = `UPDATE ${this.tableName} SET ${setClause} WHERE ${field} = ?`;
        const result = await this.query(query, [...values, value]);
        
        return result.affectedRows;
    }

    /**
     * Delete a record by ID
     * @param {number|string} id - Primary key value
     * @returns {Promise<boolean>} - True if deleted, false if not found
     */
    async deleteById(id) {
        const query = `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
        const result = await this.query(query, [id]);
        return result.affectedRows > 0;
    }

    /**
     * Delete records by specific field value
     * @param {string} field - Field name
     * @param {any} value - Field value
     * @returns {Promise<number>} - Number of deleted rows
     */
    async deleteByField(field, value) {
        const query = `DELETE FROM ${this.tableName} WHERE ${field} = ?`;
        const result = await this.query(query, [value]);
        return result.affectedRows;
    }

    /**
     * Count total records in the table
     * @param {Object} where - Optional WHERE conditions
     * @returns {Promise<number>} - Total count
     */
    async count(where = null) {
        let query = `SELECT COUNT(*) as total FROM ${this.tableName}`;
        const params = [];

        if (where) {
            const whereClause = this.buildWhereClause(where);
            query += ` WHERE ${whereClause.clause}`;
            params.push(...whereClause.params);
        }

        const results = await this.query(query, params);
        return results[0].total;
    }

    /**
     * Check if a record exists by ID
     * @param {number|string} id - Primary key value
     * @returns {Promise<boolean>} - True if exists, false otherwise
     */
    async exists(id) {
        const query = `SELECT 1 FROM ${this.tableName} WHERE ${this.primaryKey} = ? LIMIT 1`;
        const results = await this.query(query, [id]);
        return results.length > 0;
    }

    /**
     * Check if a record exists by field value
     * @param {string} field - Field name
     * @param {any} value - Field value
     * @returns {Promise<boolean>} - True if exists, false otherwise
     */
    async existsByField(field, value) {
        const query = `SELECT 1 FROM ${this.tableName} WHERE ${field} = ? LIMIT 1`;
        const results = await this.query(query, [value]);
        return results.length > 0;
    }
}

module.exports = BaseModel;
