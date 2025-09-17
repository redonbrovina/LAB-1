const BaseRepository = require("./BaseRepository");
const { Produkti, Kategoria, ProduktVariacioni } = require("../models");

class ProduktiRepository extends BaseRepository {
    constructor() {
        super(Produkti);
    }

    async getAllProduktet() {
        return await this.getAll({
            include: [
                {
                    model: Kategoria,
                    as: 'kategoria',
                    attributes: ['emri']
                },
                {
                    model: ProduktVariacioni,
                    as: 'variacionet',
                    attributes: ['cmimi', 'sasia_ne_stok']
                }
            ],
            order: [['emri', 'ASC']]
        });
    }

    async getProduktiById(produktiID) {
        return await this.getOneByField('produktiID', produktiID, {
            include: [
                {
                    model: Kategoria,
                    as: 'kategoria',
                    attributes: ['emri']
                },
                {
                    model: ProduktVariacioni,
                    as: 'variacionet',
                    attributes: ['cmimi', 'sasia_ne_stok']
                }
            ]
        });
    }

    async getProduktetByKategoria(kategoriaID) {
        return await this.getByField('kategoriaID', kategoriaID, {
            include: [
                {
                    model: Kategoria,
                    as: 'kategoria',
                    attributes: ['emri']
                },
                {
                    model: ProduktVariacioni,
                    as: 'variacionet',
                    attributes: ['cmimi', 'sasia_ne_stok']
                }
            ]
        });
    }

    async createProdukti(data) {
        return await this.insert(data);
    }

    async updateProdukti(produktiID, data) {
        return await this.updateById(produktiID, data);
    }

    async deleteProdukti(produktiID) {
        return await this.deleteById(produktiID);
    }
}

module.exports = ProduktiRepository;
