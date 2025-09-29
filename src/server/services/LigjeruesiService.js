const LigjeruesiRepository = require("../repositories/LigjeruesiRepository");

class LigjeruesiService {
    constructor() {
        this.ligjeruesiRepository = new LigjeruesiRepository();
    }

    async getAllLigjeruesit() {
        return await this.ligjeruesiRepository.getAllLigjeruesit();
    }

    async getLigjeruesiById(LecturerID) {
        return await this.ligjeruesiRepository.getLigjeruesiById(LecturerID);
    }

    async createLigjeruesi(data) {
        return await this.ligjeruesiRepository.createLigjeruesi(data);
    }

    async updateLigjeruesi(LecturerID, data) {
        await this.ligjeruesiRepository.updateLigjeruesi(LecturerID, data);
    }

    async deleteLigjeruesi(LecturerID) {
        return await this.ligjeruesiRepository.deleteLigjeruesi(LecturerID);
    }
}

module.exports = LigjeruesiService;