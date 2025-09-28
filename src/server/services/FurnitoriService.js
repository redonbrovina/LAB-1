const FurnitoriRepository = require("../repositories/FurnitoriRepository");

class FurnitoriService {
    constructor() {
        this.furnitoriRepo = new FurnitoriRepository();
    }

    async getAll() {
        return await this.furnitoriRepo.getAllFurnitore();
    }

    async getById(id) {
        const furnitori = await this.furnitoriRepo.getFurnitoriById(id);
        if (!furnitori) throw new Error("Supplier not found");
        return furnitori;
    }

    async getByShteti(shtetiID) {
        return await this.furnitoriRepo.getFurnitoreByShteti(shtetiID);
    }

    async create(data) {
        return await this.furnitoriRepo.createFurnitori(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.furnitoriRepo.updateFurnitori(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.furnitoriRepo.deleteFurnitori(id);
    }
}

module.exports = FurnitoriService;
