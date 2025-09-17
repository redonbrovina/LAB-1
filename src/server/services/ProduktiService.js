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
}

module.exports = ProduktiService;
