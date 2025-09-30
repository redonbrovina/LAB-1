const PunetoriRepository = require('../repositories/PunetoriRepository');

class PunetoriService {
    constructor() {
        this.PunetoriRepository = new PunetoriRepository();
    }

    async getAllPunetoret() {
        return await this.PunetoriRepository.getAllPunetoret();
    }

    async createPunetori(data) {
        return await this.PunetoriRepository.create(data);
    }

    async updatePunetori(id, data) {
        return await this.PunetoriRepository.update(id, data);
    }

    async deletePunetori(id) {
        return await this.PunetoriRepository.delete(id);
    }
}

module.exports = PunetoriService;