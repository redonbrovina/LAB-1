const ShtetiRepository = require('../repositories/ShtetiRepository');

class ShtetiService {
    constructor() {
        this.shtetiRepository = new ShtetiRepository();
    }

    async getAllShtetet() {
        return await this.shtetiRepository.getAllShtetet();
    }

    async getAllShtetetPaginated(page, limit) {
        return await this.shtetiRepository.getAllShtetetPaginated(page, limit);
    }

    async getShtetiById(shtetiID) {
        const shteti = await this.shtetiRepository.getShtetiById(shtetiID);
        if (!shteti) throw new Error("Country not found");
        return shteti;
    }

    async createShteti(data) {
        return await this.shtetiRepository.createShteti(data);
    }

    async updateShteti(shtetiID, data) {
        await this.getShtetiById(shtetiID);
        return await this.shtetiRepository.updateShteti(shtetiID, data);
    }

    async deleteShteti(shtetiID) {
        await this.getShtetiById(shtetiID);
        return await this.shtetiRepository.deleteShteti(shtetiID);
    }
}

module.exports = ShtetiService; 