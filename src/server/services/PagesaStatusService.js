const PagesaStatusRepository = require('../repositories/PagesaStatusRepository');

class PagesaStatusService {
    constructor() {
        this.pagesaStatusRepo = new PagesaStatusRepository();
    }

    async getAllStatuset() {
        return await this.pagesaStatusRepo.getAll();
    }

    async getStatusById(id) {
        return await this.pagesaStatusRepo.getById(id);
    }

    async createStatus(data) {
        return await this.pagesaStatusRepo.insert(data);
    }

    async updateStatus(id, data) {
        return await this.pagesaStatusRepo.updateById(id, data);
    }

    async deleteStatus(id) {
        return await this.pagesaStatusRepo.deleteById(id);
    }
}

module.exports = PagesaStatusService;
