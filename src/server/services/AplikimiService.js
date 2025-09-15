const { AplikimiRepository } = require("../repositories/");

class AplikimiService {
    constructor() {
        this.aplikimiRepository = new AplikimiRepository();
    }

    async getAllAplikimet() {
        return await this.aplikimiRepository.getAllAplikimet();
    }

    async getAplikimiById(aplikimiID) {
        return await this.aplikimiRepository.getAplikimiById(aplikimiID);
    }

    async getAplikimiByAplikimiStatusID(aplikimiStatusID) {
        return await this.aplikimiRepository.getAplikimiByAplikimiStatusID(aplikimiStatusID);
    }

    async createAplikimi(data) {
        return await this.aplikimiRepository.createAplikimi(data);
    }

    async updateAplikimi(aplikimiID, data) {
        return await this.aplikimiRepository.updateAplikimi(aplikimiID, data);
    }
    async deleteAplikimi(aplikimiID) {
        return await this.aplikimiRepository.deleteAplikimi(aplikimiID);
    }
}

module.exports = AplikimiService;