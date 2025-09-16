const { ShtetiRepository } = require('../repositories/');

class ShtetiService {
    constructor() {
        this.shtetiRepository = new ShtetiRepository()
    }

    async getAllShtetet() {
        return await this.shtetiRepository.getAllShtetet();
    }

    async getShtetiById(shtetiID) {
        return await this.shtetiRepository.getShtetiById(shtetiID);
    }
}

module.exports = ShtetiService; 