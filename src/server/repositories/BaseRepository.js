const db = require('../database/Database');

class BaseRepository {

    constructor(tableName, primaryKey = 'id') {
        this.database = db
        this.tableName = tableName
        this.primaryKey = primaryKey
    }

    async query(query, params = []) {
        return await this.database.query(query, params);
    }

    async getAll(options = {}) {
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

    async getById(id) {
        const query = `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
        const results = await this.query(query, [id]);
        return results.length > 0 ? results[0] : null;
    }

    async getByField(field, value) {
        const query = `SELECT * FROM ${this.tableName} WHERE ${field} = ?`;
        return await this.query(query, [value]);
    }

    async insert(data) {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const placeholders = fields.map(() => '?').join(', ');

        const query = `INSERT INTO ${this.tableName} (${fields.join(', ')}) VALUES (${placeholders})`;
        const result = await this.query(query, values);
        
        const createdId = result.insertId;
        return await this.getById(createdId);
    }

    async updateById(id, data) {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const setClause = fields.map(field => `${field} = ?`).join(', ');

        const query = `UPDATE ${this.tableName} SET ${setClause} WHERE ${this.primaryKey} = ?`;
        const result = await this.query(query, [...values, id]);
        
        if (result.affectedRows === 0) {
            return null;
        }
        
        return await this.getById(id);
    }

    async deleteById(id) {
        const query = `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
        const result = await this.query(query, [id]);
        return result.affectedRows > 0;
    }

    async deleteByField(field, value) {
        const query = `DELETE FROM ${this.tableName} WHERE ${field} = ?`;
        const result = await this.query(query, [value]);
        return result.affectedRows;
    }

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
}

module.exports = BaseRepository;
