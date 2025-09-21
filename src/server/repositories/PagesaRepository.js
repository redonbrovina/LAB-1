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

    async getPagesatByKlientiID(klientiID) {
        return await this.getByField('klientiID', klientiID, {
            include: [
                {
                    model: MenyraPageses,
                    as: 'menyraPageses',
                    attributes: ['menyra_pageses']
                },
                {
                    model: Porosia,
                    as: 'porosia',
                    attributes: ['porosiaID', 'koha_krijimit']
                }
            ],
            order: [['koha_pageses', 'DESC']]
        });
    }

    async getPagesatThisMonthByKlientiID(klientiID) {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        return await this.model.findAll({
            where: {
                klientiID: klientiID,
                koha_pageses: {
                    [require('sequelize').Op.between]: [startOfMonth, endOfMonth]
                }
            },
            include: [
                {
                    model: MenyraPageses,
                    as: 'menyraPageses',
                    attributes: ['menyra_pageses']
                },
                {
                    model: Porosia,
                    as: 'porosia',
                    attributes: ['porosiaID', 'koha_krijimit']
                }
            ],
            order: [['koha_pageses', 'DESC']]
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
