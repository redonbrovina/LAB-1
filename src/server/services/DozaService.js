const DozaRepository = require("../repositories/DozaRepository");

class DozaService {
    constructor() {
        this.dozaRepo = new DozaRepository();
    }

    async getAll() {
        return await this.dozaRepo.getAllDoza();
    }

    async getById(id) {
        const doza = await this.dozaRepo.getDozaById(id);
        if (!doza) throw new Error("Doza nuk u gjet");
        return doza;
    }

    async create(data) {
        return await this.dozaRepo.createDoza(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.dozaRepo.updateDoza(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.dozaRepo.deleteDoza(id);
    }
}

module.exports = DozaService;
