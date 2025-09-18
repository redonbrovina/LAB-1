const BaseRepository = require("./BaseRepository");
const { ProduktVariacioni, Furnitori, Doza, Forma, Produkti } = require("../models");

class ProduktVariacioniRepository extends BaseRepository {
    constructor() {
        super(ProduktVariacioni);
    }

    async getAllVariacione() {
        return await this.getAll({
            include: [
                {
                    model: Furnitori,
                    as: 'furnitori',
                    attributes: ['emri']
                },
                {
                    model: Doza,
                    as: 'doza',
                    attributes: ['doza']
                },
                {
                    model: Forma,
                    as: 'forma',
                    attributes: ['lloji_formes']
                },
                {
                    model: Produkti,
                    as: 'produkti',
                    attributes: ['emri', 'pershkrimi']
                }
            ]
        });
    }

    async getVariacioneTePlota() {
        return await this.getAll({
            include: [
                {
                    model: Furnitori,
                    as: 'furnitori',
                    attributes: ['emri']
                },
                {
                    model: Doza,
                    as: 'doza',
                    attributes: ['doza']
                },
                {
                    model: Forma,
                    as: 'forma',
                    attributes: ['lloji_formes']
                },
                {
                    model: Produkti,
                    as: 'produkti',
                    attributes: ['emri', 'pershkrimi']
                }
            ]
        });
    }

    async getVariacioniById(variacioniID) {
        return await this.getOneByField('produkt_variacioniID', variacioniID, {
            include: [
                {
                    model: Furnitori,
                    as: 'furnitori',
                    attributes: ['emri']
                },
                {
                    model: Doza,
                    as: 'doza',
                    attributes: ['doza']
                },
                {
                    model: Forma,
                    as: 'forma',
                    attributes: ['lloji_formes']
                },
                {
                    model: Produkti,
                    as: 'produkti',
                    attributes: ['emri', 'pershkrimi']
                }
            ]
        });
    }

    async createVariacioni(data) {
        return await this.insert(data);
    }

    async updateVariacioni(variacioniID, data) {
        return await this.updateById(variacioniID, data);
    }

    async deleteVariacioni(variacioniID) {
        return await this.deleteById(variacioniID);
    }
}

module.exports = ProduktVariacioniRepository;
