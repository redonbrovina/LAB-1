const KategoriaRepository = require("../repositories/KategoriaRepository");

class KategoriaService {
    constructor() {
        this.kategoriaRepo = new KategoriaRepository();
    }

    async getAll() {
        return await this.kategoriaRepo.getAllKategorite();
    }

    async getById(id) {
        const kategoria = await this.kategoriaRepo.getKategoriaById(id);
        if (!kategoria) throw new Error("Kategoria nuk u gjet");
        return kategoria;
    }

    async create(data) {
        return await this.kategoriaRepo.createKategoria(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.kategoriaRepo.updateKategoria(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.kategoriaRepo.deleteKategoria(id);
    }
}

module.exports = KategoriaService;
