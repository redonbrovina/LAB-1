const AplikimiStatusRepository = require('../repositories/AplikimiStatusRepository');

class AplikimiStatusService {
    constructor() {
        this.aplikimiStatusRepository = new AplikimiStatusRepository();
    }

    async getAllStatuset() {
        return await this.aplikimiStatusRepository.getAllStatuset();
    }

    async getStatusById(statusID) {
        const status = await this.aplikimiStatusRepository.getStatusById(statusID);
        if (!status) throw new Error("Status nuk u gjet");
        return status;
    }

    async createStatus(data) {
        return await this.aplikimiStatusRepository.createStatus(data);
    }

    async updateStatus(statusID, data) {
        await this.getStatusById(statusID);
        return await this.aplikimiStatusRepository.updateStatus(statusID, data);
    }

    async deleteStatus(statusID) {
        await this.getStatusById(statusID);
        return await this.aplikimiStatusRepository.deleteStatus(statusID);
    }
}

module.exports = AplikimiStatusService;
