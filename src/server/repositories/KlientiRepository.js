const BaseRepository = require("./BaseRepository");

class KlientiRepository extends BaseRepository {
    constructor() {
        super('klienti', 'klientiID');
    }

    async getAllKlientet() {
        return await this.getAll();
    }

    async getKlientiById(klientiID) {
        return await this.getByField('klientiID', klientiID);
    }

    async getKlientiByEmri(emri_kompanise) {
        return await this.getByField('emri_kompanise', emri_kompanise);
    }

    async getKlientiByEmail(email) {
        return await this.getByField('email', email);
    }

    async createKlienti(data) {
        return await this.insert(data);
    }

    async updateKlienti(klientiID, data) {
        const result = await this.updateById(klientiID, data);
        return result;
    }

    async deleteKlienti(klientiID) {
        return await this.deleteById(klientiID);
    }
}

module.exports = KlientiRepository;