const ProduktiPorosiseRepository = require('../repositories/ProduktiPorosiseRepository');

class ProduktiPorosiseService {
    constructor() {
        this.repo = new ProduktiPorosiseRepository();
    }

    async getAll() {
        return await this.repo.getAll();
    }

    async getById(id) {
        const item = await this.repo.getById(id);
        if (!item) throw new Error("Produkti nuk u gjet");
        return item;
    }

    async create(data) {
        return await this.repo.insert(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.repo.updateById(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.repo.deleteById(id);
    }
}

module.exports = ProduktiPorosiseService;
