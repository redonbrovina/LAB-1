const BaseRepository = require("./BaseRepository");
const { Forma, ProduktVariacioni } = require("../models");

class FormaRepository extends BaseRepository {
    constructor() {
        super(Forma);
    }

    async getAllForma() {
        return await this.getAll({
            include: [
                {
                    model: ProduktVariacioni,
                    as: 'variacionet',
                    attributes: ['cmimi', 'sasia_ne_stok']
                }
            ],
            order: [['lloji_formes', 'ASC']]
        });
    }

    async getFormaById(formaID) {
        return await this.getOneByField('formaID', formaID, {
            include: [
                {
                    model: ProduktVariacioni,
                    as: 'variacionet',
                    attributes: ['cmimi', 'sasia_ne_stok']
                }
            ]
        });
    }

    async createForma(data) {
        return await this.insert(data);
    }

    async updateForma(formaID, data) {
        return await this.updateById(formaID, data);
    }

    async deleteForma(formaID) {
        return await this.deleteById(formaID);
    }
}

module.exports = FormaRepository;