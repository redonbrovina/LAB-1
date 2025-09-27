const BaseRepository = require("./BaseRepository");
const { Shteti } = require("../models");

class ShtetiRepository extends BaseRepository {
    constructor() {
        super(Shteti);
    }

    async getAllShtetet() {
        return await this.getAll({
            order: [['emri_shtetit', 'ASC']],
            attributes: ['shtetiID', 'emri_shtetit', 'iso_kodi']
        });
    }

    async getAllShtetetPaginated(page, limit) {
        const offset = (page - 1) * limit;
        
        const { count, rows } = await Shteti.findAndCountAll({
            order: [['emri_shtetit', 'ASC']],
            attributes: ['shtetiID', 'emri_shtetit', 'iso_kodi'],
            limit: limit,
            offset: offset
        });

        return {
            data: rows,
            total: count,
            page: page,
            limit: limit,
            totalPages: Math.ceil(count / limit)
        };
    }

    async getShtetiById(shtetiID) {
        return await this.getOneByField('shtetiID', shtetiID);
    }

    async createShteti(data) {
        return await this.insert(data);
    }

    async updateShteti(shtetiID, data) {
        return await this.updateById(shtetiID, data);
    }

    async deleteShteti(shtetiID) {
        return await this.deleteById(shtetiID);
    }
}

module.exports = ShtetiRepository;