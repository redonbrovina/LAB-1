const BaseRepository = require("./BaseRepository");
const { LevizjaNeStok, ProduktVariacioni, Porosia, Admin } = require("../models");

class LevizjaNeStokRepository extends BaseRepository {
    constructor() {
        super(LevizjaNeStok);
    }

    async getAllLevizjet() {
        return await this.getAll({
            include: [
                {
                    model: ProduktVariacioni,
                    as: 'produktVariacioni',
                    attributes: ['produkt_variacioniID', 'cmimi']
                },
                {
                    model: Porosia,
                    as: 'porosia',
                    attributes: ['porosiaID', 'koha_krijimit', 'cmimi_total']
                },
                {
                    model: Admin,
                    as: 'admin',
                    attributes: ['adminID', 'email']
                }
            ],
            order: [['koha_krijimit', 'DESC']]
        });
    }

    async getLevizjaById(levizjaID) {
        return await this.getOneByField('levizjaID', levizjaID, {
            include: [
                {
                    model: ProduktVariacioni,
                    as: 'produktVariacioni',
                    attributes: ['produkt_variacioniID', 'cmimi']
                },
                {
                    model: Porosia,
                    as: 'porosia',
                    attributes: ['porosiaID', 'koha_krijimit', 'cmimi_total']
                },
                {
                    model: Admin,
                    as: 'admin',
                    attributes: ['adminID', 'email']
                }
            ]
        });
    }

    async createLevizja(data) {
        return await this.insert(data);
    }

    async updateLevizja(levizjaID, data) {
        return await this.updateById(levizjaID, data);
    }

    async deleteLevizja(levizjaID) {
        return await this.deleteById(levizjaID);
    }
}

module.exports = LevizjaNeStokRepository;
