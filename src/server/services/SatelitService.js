const SatelitRepository = require("../repositories/SatelitRepository");

class SatelitService {
    constructor() {
        this.satelitRepo = new SatelitRepository();
    }

    async getAll() {
        return await this.satelitRepo.getAllSatelitet();
    }

    async getDeleted() {
        return await this.satelitRepo.getSatelitetDeleted();
    }

    async getById(id) {
        const satelit = await this.satelitRepo.getSatelitById(id);
        if (!satelit) throw new Error("Satellite not found");
        return satelit;
    }

    async create(data) {
        return await this.satelitRepo.createSatelit(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.satelitRepo.updateSatelit(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.satelitRepo.deleteSatelit(id);
    }
}

module.exports = SatelitService;
