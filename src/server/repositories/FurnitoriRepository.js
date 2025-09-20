const BaseRepository = require("./BaseRepository");
const { Furnitori, Shteti, Produkti } = require("../models");

class FurnitoriRepository extends BaseRepository {
    constructor() {
        super(Furnitori);
    }

    async getAllFurnitore() {
        return await this.getAll({
            include: [
                {
                    model: Shteti,
                    as: 'shteti',
                    attributes: ['emri_shtetit']
                },
                {
                    model: Produkti,
                    as: 'produktet',
                    attributes: ['emri', 'sasia_ne_stok']
                }
            ],
            order: [['emri', 'ASC']]
        });
    }

    async getFurnitoriById(furnitoriID) {
        return await this.getOneByField('furnitoriID', furnitoriID, {
            include: [
                {
                    model: Shteti,
                    as: 'shteti',
                    attributes: ['emri_shtetit']
                },
                {
                    model: Produkti,
                    as: 'produktet',
                    attributes: ['emri', 'sasia_ne_stok']
                }
            ]
        });
    }

    async getFurnitoreByShteti(shtetiID) {
        return await this.getByField('shtetiID', shtetiID, {
            include: [
                {
                    model: Shteti,
                    as: 'shteti',
                    attributes: ['emri_shtetit']
                }
            ]
        });
    }

    async createFurnitori(data) {
        return await this.insert(data);
    }

    async updateFurnitori(furnitoriID, data) {
        return await this.updateById(furnitoriID, data);
    }

    async deleteFurnitori(furnitoriID) {
        return await this.deleteById(furnitoriID);
    }
}

module.exports = FurnitoriRepository;
