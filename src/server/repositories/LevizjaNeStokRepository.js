const BaseRepository = require('./BaseRepository');

class LevizjaNeStokRepository extends BaseRepository {
    constructor() {
        super('leviza_ne_stok', 'levizjaID');
    }

    async getByProduktVariacioniID(produktVariacioniID) {
        const query = `SELECT * FROM ${this.tableName} WHERE produkt_variacioniID = ?`;
        const results = await this.db.query(query, [produktVariacioniID]);
        return results;
    }

    async getByPorosiaID(porosiaID) {
        const query = `SELECT * FROM ${this.tableName} WHERE porosiaID = ?`;
        const results = await this.db.query(query, [porosiaID]);
        return results;
    }
}

module.exports = LevizjaNeStokRepository;
