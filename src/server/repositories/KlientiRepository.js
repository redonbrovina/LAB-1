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

    async getPaginatedKlientet(options = {}) {
        return await this.getPaginated({
            include: [{
                model: Shteti,
                as: 'shteti',
                attributes: ['emri_shtetit']
            }],
            ...options
        });
    }

    async getKlientiById(klientiID) {
        return await this.getOneByField('klientiID', klientiID);
    }

    async getKlientiByEmail(email) {
        return await this.getOneByField('email', email);
    }

    async getKlientiByEmri(emri_kompanise) {
        const { Op } = require('sequelize');
        return await this.getAll({
            where: {
                emri_kompanise: { [Op.like]: `%${emri_kompanise}%` }
            },
            include: [{
                model: Shteti,
                as: 'shteti',
                attributes: ['emri_shtetit']
            }],
            order: [['emri_kompanise', 'ASC']]
        });
    }

    async searchKlientet(query) {
        const { Op } = require('sequelize');
        return await this.getAll({
            where: {
                [Op.or]: [
                    { emri_kompanise: { [Op.like]: `%${query}%` } },
                    { email: { [Op.like]: `%${query}%` } }
                ]
            },
            include: [{
                model: Shteti,
                as: 'shteti',
                attributes: ['emri_shtetit']
            }],
            order: [['emri_kompanise', 'ASC']]
        });
    }

    async getKlientiByAplikimiID(aplikimiID) {
        return await this.getOneByField('aplikimiID', aplikimiID);
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