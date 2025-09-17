const AplikimiRepository = require("../repositories/AplikimiRepository");

class AplikimiService {
    constructor() {
        this.aplikimiRepository = new AplikimiRepository();
    }

    async getAllAplikimet() {
        return await this.aplikimiRepository.getAllAplikimet();
    }

    async getAplikimiById(aplikimiID) {
        const aplikimi = await this.aplikimiRepository.getAplikimiById(aplikimiID);
        if (!aplikimi) throw new Error("Aplikimi nuk u gjet");
        return aplikimi;
    }

    async getAplikimiByAplikimiStatusID(aplikimiStatusID) {
        return await this.aplikimiRepository.getAplikimiByAplikimiStatusID(aplikimiStatusID);
    }

    async createAplikimi(data) {
        return await this.aplikimiRepository.createAplikimi(data);
    }

    async updateAplikimi(aplikimiID, data) {
        await this.getAplikimiById(aplikimiID);
        return await this.aplikimiRepository.updateAplikimi(aplikimiID, data);
    }

    async deleteAplikimi(aplikimiID) {
        await this.getAplikimiById(aplikimiID);
        return await this.aplikimiRepository.deleteAplikimi(aplikimiID);
    }
}

module.exports = AplikimiService;