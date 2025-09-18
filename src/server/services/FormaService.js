const FormaRepository = require("../repositories/FormaRepository");

class FormaService {
    constructor() {
        this.formaRepo = new FormaRepository();
    }

    async getAll() {
        return await this.formaRepo.getAllForma();
    }

    async getById(id) {
        const forma = await this.formaRepo.getFormaById(id);
        if (!forma) throw new Error("Forma nuk u gjet");
        return forma;
    }

    async create(data) {
        return await this.formaRepo.createForma(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.formaRepo.updateForma(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.formaRepo.deleteForma(id);
    }
}

module.exports = FormaService;
