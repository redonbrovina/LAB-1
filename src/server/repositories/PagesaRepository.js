const BaseRepository = require("./BaseRepository");
const { Pagesa, Porosia, MenyraPageses } = require("../models");

class PagesaRepository extends BaseRepository {
    constructor() {
        super(Pagesa);
    }

    async getAllPagesat() {
        return await this.getAll({
            include: [
                {
                    model: Porosia,
                    as: 'porosia',
                    attributes: ['porosiaID', 'cmimi_total']
                },
                {
                    model: MenyraPageses,
                    as: 'menyraPageses',
                    attributes: ['menyra_pageses']
                }
            ],
            order: [['koha_pageses', 'DESC']]
        });
    }

    async getPagesaById(pagesaID) {
        return await this.getOneByField('pagesaID', pagesaID, {
            include: [
                {
                    model: Porosia,
                    as: 'porosia',
                    attributes: ['porosiaID', 'cmimi_total']
                },
                {
                    model: MenyraPageses,
                    as: 'menyraPageses',
                    attributes: ['menyra_pageses']
                }
            ]
        });
    }

    async getPagesatByPorosia(porosiaID) {
        return await this.getByField('porosiaID', porosiaID, {
            include: [
                {
                    model: MenyraPageses,
                    as: 'menyraPageses',
                    attributes: ['menyra_pageses']
                }
            ]
        });
    }

    async createPagesa(data) {
        return await this.insert(data);
    }

    async updatePagesa(pagesaID, data) {
        return await this.updateById(pagesaID, data);
    }

    async deletePagesa(pagesaID) {
        return await this.deleteById(pagesaID);
    }
}

module.exports = PagesaRepository;
