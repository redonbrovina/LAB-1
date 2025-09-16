const {KlientiRepository} = require('../repositories');

class KlientiService {
    constructor() {
        this.klientiRepository = new KlientiRepository();
    }

    async getAllKlientet() {
        return await this.klientiRepository.getAllKlientet();
    }
    async getKlientiById(klientiID) {
        return await this.klientiRepository.getKlientiById(klientiID);
    }

    async getKlientiByEmri(emri_kompanise) {
        return await this.klientiRepository.getKlientiByEmri(emri_kompanise);
    }

    async createKlienti(data) {
        return await this.klientiRepository.createKlienti(data);
    }
    async updateKlienti(klientiID, data) {
        return await this.klientiRepository.updateKlienti(klientiID, data);
    }
    async deleteKlienti(klientiID) {
        return await this.klientiRepository.deleteKlienti(klientiID);
    }
}

module.exports = KlientiService;