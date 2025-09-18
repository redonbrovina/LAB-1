const BaseRepository = require("./BaseRepository");
const { Klienti } = require("../models");
const { Shteti } = require("../models");

class KlientiRepository extends BaseRepository {
    constructor() {
        super(Klienti);
    }

    async getAllKlientet() {
        return await this.getAll({
            include: [{
                model: Shteti,
                as: 'shteti',
                attributes: ['emri_shtetit']
            }]
        });
    }

    async getKlientiById(klientiID) {
        return await this.getByField('klientiID', klientiID);
    }

    async getKlientiByEmail(email) {
        return await this.getByField('email', email);
    }

    async createKlienti(data) {
        return await this.insert(data);
    }

    async updateKlienti(klientiID, data) {
        return await this.updateById(klientiID, data);
    }

    async deleteKlienti(klientiID) {
        return await this.deleteById(klientiID);
    }
}

module.exports = KlientiRepository;