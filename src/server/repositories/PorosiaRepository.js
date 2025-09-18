const BaseRepository = require('./BaseRepository');
const { Porosia, PorosiaStatus, PagesaStatus, Klienti, ProduktPorosise, ProduktVariacioni } = require("../models");

class PorosiaRepository extends BaseRepository {
    constructor() {
        super(Porosia);
    }

    async getAllPorosite() {
        return await this.getAll({
            include: [
                {
                    model: PorosiaStatus,
                    as: 'porosiaStatus',
                    attributes: ['statusi']
                },
                {
                    model: PagesaStatus,
                    as: 'pagesaStatus',
                    attributes: ['statusi']
                },
                {
                    model: Klienti,
                    as: 'klienti',
                    attributes: ['emri_kompanise', 'email']
                }
            ],
            order: [['koha_krijimit', 'DESC']]
        });
    }

    async getPorosiaById(porosiaID) {
        return await this.getOneByField('porosiaID', porosiaID, {
            include: [
                {
                    model: PorosiaStatus,
                    as: 'porosiaStatus',
                    attributes: ['statusi']
                },
                {
                    model: PagesaStatus,
                    as: 'pagesaStatus',
                    attributes: ['statusi']
                },
                {
                    model: Klienti,
                    as: 'klienti',
                    attributes: ['emri_kompanise', 'email']
                },
                {
                    model: ProduktPorosise,
                    as: 'produktet',
                    include: [{
                        model: ProduktVariacioni,
                        as: 'produktVariacioni',
                        attributes: ['cmimi', 'sasia_ne_stok']
                    }]
                }
            ]
        });
    }

    async getPorositeByKlientiID(klientiID) {
        return await this.getByField('klientiID', klientiID, {
            include: [
                {
                    model: PorosiaStatus,
                    as: 'porosiaStatus',
                    attributes: ['statusi']
                },
                {
                    model: PagesaStatus,
                    as: 'pagesaStatus',
                    attributes: ['statusi']
                }
            ],
            order: [['koha_krijimit', 'DESC']]
        });
    }

    async createPorosia(data) {
        return await this.insert(data);
    }

    async updatePorosia(porosiaID, data) {
        return await this.updateById(porosiaID, data);
    }

    async deletePorosia(porosiaID) {
        return await this.deleteById(porosiaID);
    }
}

module.exports = PorosiaRepository;
