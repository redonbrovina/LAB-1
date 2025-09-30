const FabrikaRepository = require('../repositories/FabrikaRepository');

class FabrikaService {
    constructor() {
        this.fabrikaRepository = new FabrikaRepository();
    }

    async getAllFabrikat() {
        return await this.fabrikaRepository.getAllFabrikat();
    }

    async createFabrika(data) {
        return await this.fabrikaRepository.create(data);
    }

    async updateFabrika(id, data) {
        return await this.fabrikaRepository.update(id, data);
    }

    async deleteFabrika(id) {
        return await this.fabrikaRepository.delete(id);
    }
}

module.exports = FabrikaService;