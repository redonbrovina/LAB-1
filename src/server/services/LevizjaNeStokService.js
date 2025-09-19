const LevizjaNeStokRepository = require("../repositories/LevizjaNeStokRepository");

class LevizjaNeStokService {
    constructor() {
        this.levizjaRepo = new LevizjaNeStokRepository();
    }

    async getAll() {
        return await this.levizjaRepo.getAllLevizjet();
    }

    async getById(id) {
        const levizja = await this.levizjaRepo.getLevizjaById(id);
        if (!levizja) throw new Error("Levizja nuk u gjet");
        return levizja;
    }

    async create(data) {
        // Validate required fields
        if (!data.lloji_levizjes || !data.sasia || !data.produkt_variacioniID) {
            throw new Error("Lloji i levizjes, sasia dhe produkt_variacioniID janë të detyrueshëm");
        }

        // Validate sasia is positive
        if (data.sasia <= 0) {
            throw new Error("Sasia duhet të jetë pozitive");
        }

        return await this.levizjaRepo.createLevizja(data);
    }

    async update(id, data) {
        await this.getById(id);
        
        // Validate sasia if provided
        if (data.sasia !== undefined && data.sasia <= 0) {
            throw new Error("Sasia duhet të jetë pozitive");
        }

        return await this.levizjaRepo.updateLevizja(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.levizjaRepo.deleteLevizja(id);
    }

    async getByProduktVariacioni(produktVariacioniID) {
        return await this.levizjaRepo.getByField('produkt_variacioniID', produktVariacioniID);
    }

    async getByPorosia(porosiaID) {
        return await this.levizjaRepo.getByField('porosiaID', porosiaID);
    }

    async getByAdmin(adminID) {
        return await this.levizjaRepo.getByField('adminID', adminID);
    }
}

module.exports = LevizjaNeStokService;
