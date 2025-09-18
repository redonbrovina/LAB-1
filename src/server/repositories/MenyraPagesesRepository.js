const BaseRepository = require("./BaseRepository");
const { MenyraPageses, Pagesa } = require("../models");

class MenyraPagesesRepository extends BaseRepository {
    constructor() {
        super(MenyraPageses);
    }

    async getAllMenyraPageses() {
        return await this.getAll({
            include: [
                {
                    model: Pagesa,
                    as: 'pagesat',
                    attributes: ['pagesaID', 'shuma_pageses']
                }
            ],
            order: [['menyra_pageses', 'ASC']]
        });
    }

    async getMenyraPagesesById(menyraPagesesID) {
        return await this.getOneByField('menyra_pagesesID', menyraPagesesID, {
            include: [
                {
                    model: Pagesa,
                    as: 'pagesat',
                    attributes: ['pagesaID', 'shuma_pageses']
                }
            ]
        });
    }

    async createMenyraPageses(data) {
        return await this.insert(data);
    }

    async updateMenyraPageses(menyraPagesesID, data) {
        return await this.updateById(menyraPagesesID, data);
    }

    async deleteMenyraPageses(menyraPagesesID) {
        return await this.deleteById(menyraPagesesID);
    }
}

module.exports = MenyraPagesesRepository;
