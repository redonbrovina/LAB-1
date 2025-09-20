const KlientiRepository = require('../repositories/KlientiRepository');

class KlientiService {
    constructor() {
        this.klientiRepository = new KlientiRepository();
    }

    async getAllKlientet() {
        return await this.klientiRepository.getAllKlientet();
    }

    async getKlientiById(klientiID) {
        const klienti = await this.klientiRepository.getKlientiById(klientiID);
        if (!klienti) throw new Error("Klienti nuk u gjet");
        return klienti;
    }

    async getKlientiByEmail(email) {
        return await this.klientiRepository.getKlientiByEmail(email);
    }

    async getKlientiByEmri(emri_kompanise) {
        return await this.klientiRepository.getKlientiByEmri(emri_kompanise);
    }

    async getKlientiByAplikimiID(aplikimiID) {
        return await this.klientiRepository.getKlientiByAplikimiID(aplikimiID);
    }

    async createKlienti(data) {
        return await this.klientiRepository.createKlienti(data);
    }

    async updateKlienti(klientiID, data) {
        await this.getKlientiById(klientiID);
        return await this.klientiRepository.updateKlienti(klientiID, data);
    }

    async deleteKlienti(klientiID) {
        await this.getKlientiById(klientiID);
        return await this.klientiRepository.deleteKlienti(klientiID);
    }
}

module.exports = KlientiService;