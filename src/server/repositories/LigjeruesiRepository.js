const BaseRepository = require("./BaseRepository");
const { Ligjeruesi } = require("../models");

class LigjeruesiRepository extends BaseRepository {
    constructor() {
        super(Ligjeruesi);
    }

    async getAllLigjeruesit() {
        return await this.getAll({
            attributes: ['LecturerID', 'LecturerName', 'Email', 'Department']
        });
    }

    async getLigjeruesiById(LecturerID) {
        return await this.getById(LecturerID);
    }

    async createLigjeruesi(data) {
        return await this.insert(data);
    }

    async updateLigjeruesi(LecturerID, data) {
        return await this.updateById(LecturerID, data);
    }

    async deleteLigjeruesi(LecturerID) {
        return await this.deleteById(LecturerID);
    }
}

module.exports = LigjeruesiRepository;