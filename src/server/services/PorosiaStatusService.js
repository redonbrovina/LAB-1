const PorosiaStatusRepository = require("../repositories/PorosiaStatusRepository");

class PorosiaStatusService {
    constructor() {
        this.statusRepo = new PorosiaStatusRepository();
    }

    async getAll() {
        return await this.statusRepo.getAllStatuset();
    }

    async getById(id) {
        const status = await this.statusRepo.getStatusById(id);
        if (!status) throw new Error("Statusi i porosise nuk u gjet");
        return status;
    }

    async create(data) {
        return await this.statusRepo.createStatus(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.statusRepo.updateStatus(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.statusRepo.deleteStatus(id);
    }
}

module.exports = PorosiaStatusService;
