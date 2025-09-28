const LigjerataRepository = require("../repositories/LigjerataRepository");

class LigjerataService {
    constructor() {
        this.ligjerataRepository = new LigjerataRepository();
    }

    async getAllLigjeratat() {
        return await this.ligjerataRepository.getAllLigjeratat();
    }

    async getLigjerataById(LectureID) {
        return await this.ligjerataRepository.getLigjerataById(LectureID);
    }

    async createLigjerata(data) {
        return await this.ligjerataRepository.createLigjerata(data);
    }

    async updateLigjerata(LectureID, data) {
        await this.ligjerataRepository.updateLigjerata(LectureID, data);
    }

    async deleteLigjerata(LectureID) {
        return await this.ligjerataRepository.deleteLigjerata(LectureID);
    }
}

module.exports = LigjerataService;