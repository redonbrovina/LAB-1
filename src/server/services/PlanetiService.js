const PlanetiRepository = require("../repositories/PlanetiRepository");

class PlanetiService {
    constructor() {
        this.planetiRepo = new PlanetiRepository();
    }

    async getAllPlanetet() {
        return await this.planetiRepo.getAllPlanetet();
    }

    async getPlanetiById(id) {
        const planeti = await this.planetiRepo.getPlanetiById(id);
        if (!planeti) throw new Error("Planeti not found");
        return planeti;
    }

    async createPlaneti(data) {
        return await this.planetiRepo.createPlaneti(data);
    }

    async updatePlaneti(id, data) {
        await this.getPlanetiById(id);
        return await this.planetiRepo.updatePlaneti(id, data);
    }

    async deletePlaneti(id) {
        await this.getPlanetiById(id);
        return await this.planetiRepo.deletePlaneti(id);
    }
}

module.exports = PlanetiService;
