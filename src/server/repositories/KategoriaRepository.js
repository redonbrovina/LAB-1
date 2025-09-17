const BaseRepository = require("./BaseRepository");
const { Kategoria, Produkti } = require("../models");

class KategoriaRepository extends BaseRepository {
    constructor() {
        super(Kategoria);
    }

    async getAllKategorite() {
        return await this.getAll({
            include: [
                {
                    model: Produkti,
                    as: 'produktet',
                    attributes: ['emri', 'pershkrimi']
                }
            ],
            order: [['emri', 'ASC']]
        });
    }

    async getKategoriaById(kategoriaID) {
        return await this.getOneByField('kategoriaID', kategoriaID, {
            include: [
                {
                    model: Produkti,
                    as: 'produktet',
                    attributes: ['emri', 'pershkrimi']
                }
            ]
        });
    }

    async createKategoria(data) {
        return await this.insert(data);
    }

    async updateKategoria(kategoriaID, data) {
        return await this.updateById(kategoriaID, data);
    }

    async deleteKategoria(kategoriaID) {
        return await this.deleteById(kategoriaID);
    }
}

module.exports = KategoriaRepository;