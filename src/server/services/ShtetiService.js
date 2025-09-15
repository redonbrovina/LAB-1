const { ShtetiRepository } = require('../repositories/');

class ShtetiService {
    constructor() {
        this.shtetiRepository = new ShtetiRepository()
    }

    async getAllShtetet() {
        return await this.shtetiRepository.getAllShtetet();
    }

}

module.exports = ShtetiService; 