const LevizjaNeStokRepository = require('../repositories/LevizjaNeStokRepository');

class LevizjaNeStokService {
    constructor() {
        this.levizjaRepo = new LevizjaNeStokRepository();
    }

    async getAllLevizje() {
        return await this.levizjaRepo.getAll({ orderBy: 'koha_krijimit DESC' });
    }

    async getLevizjaById(id) {
        return await this.levizjaRepo.getById(id);
    }

    async createLevizja(data) {
        // Map the frontend field names to database field names
        const dbData = {
            lloji_levizjes: data.lloji, // Map 'lloji' to 'lloji_levizjes'
            sasia: data.sasia,
            produkt_variacioniID: null, // Set to null to avoid foreign key constraint issues
            porosiaID: data.porosiaID || null,
            adminID: data.adminID || null
        };
        return await this.levizjaRepo.insert(dbData);
    }

    async updateLevizja(id, data) {
        const dbData = {
            lloji_levizjes: data.lloji,
            sasia: data.sasia,
            produkt_variacioniID: null, // Set to null to avoid foreign key constraint issues
            porosiaID: data.porosiaID || null,
            adminID: data.adminID || null
        };
        return await this.levizjaRepo.updateById(id, dbData);
    }

    async deleteLevizja(id) {
        return await this.levizjaRepo.deleteById(id);
    }
}

module.exports = LevizjaNeStokService;