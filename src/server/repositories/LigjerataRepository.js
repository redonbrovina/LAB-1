const BaseRepository = require("./BaseRepository");
const { Ligjerata, Ligjeruesi } = require("../models");

class LigjerataRepository extends BaseRepository {
    constructor() {
        super(Ligjerata);
    }

    async getAllLigjeratat() {
        return await this.getAll({
            include: [{
                model: Ligjeruesi,
                as: 'Ligjeruesi',
                attributes: ['LecturerName']
            }]
        });
    }

    async getLigjerataById(LectureID) {
        return await this.getById(LectureID);
    }

    async createLigjerata(data) {
        return await this.insert(data);
    }

    async updateLigjerata(LectureID, data) {
        return await this.updateById(LectureID, data);
    }

    async deleteLigjerata(LectureID) {
        return await this.deleteById(LectureID);
    }
}

module.exports = LigjerataRepository;
