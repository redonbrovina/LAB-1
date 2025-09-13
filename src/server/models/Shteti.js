const BaseModel = require('./BaseModel');

/**
 * ShtetiModel - Handles country-related database operations
 * Example model extending BaseModel
 */
class Shteti extends BaseModel {
    constructor() {
        super('shteti', 'shtetiID');
    }

    /**
     * Find country by ISO code
     * @param {string} isoCode - ISO country code
     * @returns {Promise<Object|null>} - Country object or null
     */
    async findByIsoCode(isoCode) {
        return await this.findOneByField('iso_kodi', isoCode);
    }

    /**
     * Search countries by name (case insensitive)
     * @param {string} name - Country name to search
     * @returns {Promise<Array>} - Array of matching countries
     */
    async searchByName(name) {
        const query = `SELECT * FROM ${this.tableName} WHERE LOWER(emri_shtetit) LIKE LOWER(?) ORDER BY emri_shtetit`;
        return await this.query(query, [`%${name}%`]);
    }

    /**
     * Get all countries ordered by name
     * @returns {Promise<Array>} - Array of all countries
     */
    async getAllOrderedByName() {
        return await this.findAll({ orderBy: 'emri_shtetit' });
    }
}

module.exports = Shteti;
