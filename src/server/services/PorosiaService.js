const PorosiaRepository = require('../repositories/PorosiaRepository');

class PorosiaService {
    constructor() {
        this.porosiaRepo = new PorosiaRepository();
    }

    async getAllPorosite() {
        return await this.porosiaRepo.getAll({ orderBy: 'koha_krijimit DESC' });
    }

    async getPorosiaById(id) {
        return await this.porosiaRepo.getWithStatus(id);
    }

    async createPorosia(data) {
        return await this.porosiaRepo.insert(data);
    }

    async updatePorosia(id, data) {
        return await this.porosiaRepo.updateById(id, data);
    }

    async deletePorosia(id) {
        return await this.porosiaRepo.deleteById(id);
    }
}

module.exports = PorosiaService;
