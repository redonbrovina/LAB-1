const PorosiaRepository = require('../repositories/PorosiaRepository');
const ProduktiPorosiseRepository = require('../repositories/ProduktiPorosiseRepository');

class PorosiaService {
    constructor() {
        this.porosiaRepo = new PorosiaRepository();
        this.produktiPorosiseRepo = new ProduktiPorosiseRepository();
    }

    async getAllPorosite() {
        return await this.porosiaRepo.getAllPorosite();
    }

    async getPorosiaById(id) {
        return await this.porosiaRepo.getPorosiaById(id);
    }

    async getPorositeByKlientiID(klientiID) {
        return await this.porosiaRepo.getPorositeByKlientiID(klientiID);
    }

    async createPorosia(data) {
        return await this.porosiaRepo.createPorosia(data);
    }

    async updatePorosia(id, data) {
        return await this.porosiaRepo.updatePorosia(id, data);
    }

    async deletePorosia(id) {
        return await this.porosiaRepo.deletePorosia(id);
    }

    async getOrderItems(porosiaID) {
        return await this.produktiPorosiseRepo.getByPorosiaId(porosiaID);
    }

    async getOrderItemsWithProductInfo(porosiaID) {
        return await this.produktiPorosiseRepo.getOrderItemsWithProductInfo(porosiaID);
    }
}

module.exports = PorosiaService;
