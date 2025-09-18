const BaseRepository = require('./BaseRepository');

class MenyraPagesesRepository extends BaseRepository {
    constructor() {
        super('menyra_pageses', 'menyra_pagesesID');
    }

    async getByEmri(emri) {
        const query = `SELECT * FROM ${this.tableName} WHERE menyra_pageses = ?`;
        const results = await this.db.query(query, [emri]);
        return results[0];
    }
}

module.exports = MenyraPagesesRepository;
