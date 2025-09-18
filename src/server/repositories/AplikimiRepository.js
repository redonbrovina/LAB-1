const BaseRepository = require("./BaseRepository");
const { Aplikimi, AplikimiStatus, Admin, Shteti } = require("../models");

class AplikimiRepository extends BaseRepository {
    constructor() {
        super(Aplikimi);
    }

    async getAllAplikimet() {
        return await this.getAll({
            include: [
                {
                    model: AplikimiStatus,
                    as: 'statusi',
                    attributes: ['statusi']
                },
                {
                    model: Admin,
                    as: 'admin',
                    attributes: ['email']
                },
                {
                    model: Shteti,
                    as: 'shteti',
                    attributes: ['emri_shtetit']
                }
            ],
            order: [['koha_aplikimit', 'DESC']]
        });
    }

    async getAplikimiById(aplikimiID) {
        return await this.getOneByField('aplikimiID', aplikimiID, {
            include: [
                {
                    model: AplikimiStatus,
                    as: 'statusi',
                    attributes: ['statusi']
                },
                {
                    model: Admin,
                    as: 'admin',
                    attributes: ['email']
                },
                {
                    model: Shteti,
                    as: 'shteti',
                    attributes: ['emri_shtetit']
                }
            ]
        });
    }

    async getAplikimiByAplikimiStatusID(aplikimiStatusID) {
        return await this.getByField('aplikimi_statusID', aplikimiStatusID, {
            include: [
                {
                    model: AplikimiStatus,
                    as: 'statusi',
                    attributes: ['statusi']
                },
                {
                    model: Shteti,
                    as: 'shteti',
                    attributes: ['emri_shtetit']
                }
            ]
        });
    }

    async createAplikimi(data) {
        return await this.insert(data);
    }

    async updateAplikimi(aplikimiID, data) {
        return await this.updateById(aplikimiID, data);
    }

    async deleteAplikimi(aplikimiID) {
        return await this.deleteById(aplikimiID);
    }
}

module.exports = AplikimiRepository;