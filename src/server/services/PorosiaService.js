const PorosiaRepository = require('../repositories/PorosiaRepository');

class PorosiaService {
    constructor() {
        this.porosiaRepo = new PorosiaRepository();
    }

    async getAllPorosite() {
        return await this.porosiaRepo.getAllPorosite();
    }

    async getPorosiaById(id) {
        return await this.porosiaRepo.getPorosiaById(id);
    }

    async getPorositeByKlientiID(klientiID) {
        return await this.porosiaRepo.getPorositeByKlientiID(klientiID);
    }

    async createPorosia(data) {
        return await this.porosiaRepo.createPorosia(data);
    }

    async updatePorosia(id, data) {
        return await this.porosiaRepo.updatePorosia(id, data);
    }

    async deletePorosia(id) {
        return await this.porosiaRepo.deletePorosia(id);
    }
}

module.exports = PorosiaService;
