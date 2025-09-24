const ProduktiRepository = require("../repositories/ProduktiRepository");

class ProduktiService {
    constructor() {
        this.produktiRepo = new ProduktiRepository();
    }

    async getAll() {
        return await this.produktiRepo.getAllProduktet();
    }

    async getById(id) {
        const produkti = await this.produktiRepo.getProduktiById(id);
        if (!produkti) throw new Error("Produkti nuk u gjet");
        return produkti;
    }

    async getByKategoria(kategoriaID) {
        return await this.produktiRepo.getProduktetByKategoria(kategoriaID);
    }

    async create(data) {
        return await this.produktiRepo.createProdukti(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.produktiRepo.updateProdukti(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.produktiRepo.deleteProdukti(id);
    }

    // Search products by name or description
    async search(query) {
        return await this.produktiRepo.searchProduktet(query);
    }

    // Get paginated products
    async getPaginated(page = 1, limit = 12) {
        return await this.produktiRepo.getPaginatedProduktet(page, limit);
    }

    // Get products with category details
    async getAllWithCategory() {
        return await this.produktiRepo.getAllProduktet();
    }

    // Get product with full details including variations
    async getProductWithVariations(productId) {
        return await this.produktiRepo.getProduktiById(productId);
    }
}

module.exports = ProduktiService;
