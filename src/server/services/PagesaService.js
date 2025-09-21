const PagesaRepository = require("../repositories/PagesaRepository");

class PagesaService {
    constructor() {
        this.pagesaRepo = new PagesaRepository();
    }

    async getAll() {
        return await this.pagesaRepo.getAllPagesat();
    }

    async getById(id) {
        const pagesa = await this.pagesaRepo.getPagesaById(id);
        if (!pagesa) throw new Error("Pagesa nuk u gjet");
        return pagesa;
    }

    async getByPorosia(porosiaID) {
        return await this.pagesaRepo.getPagesatByPorosia(porosiaID);
    }

    async getByKlientiID(klientiID) {
        return await this.pagesaRepo.getPagesatByKlientiID(klientiID);
    }

    async getThisMonthByKlientiID(klientiID) {
        return await this.pagesaRepo.getPagesatThisMonthByKlientiID(klientiID);
    }

    async create(data) {
        return await this.pagesaRepo.createPagesa(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.pagesaRepo.updatePagesa(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.pagesaRepo.deletePagesa(id);
    }
}

module.exports = PagesaService;
