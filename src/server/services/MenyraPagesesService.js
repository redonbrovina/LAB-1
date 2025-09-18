const MenyraPagesesRepository = require("../repositories/MenyraPagesesRepository");

class MenyraPagesesService {
    constructor() {
        this.menyraPagesesRepo = new MenyraPagesesRepository();
    }

    async getAll() {
        return await this.menyraPagesesRepo.getAllMenyraPageses();
    }

    async getById(id) {
        const menyraPageses = await this.menyraPagesesRepo.getMenyraPagesesById(id);
        if (!menyraPageses) throw new Error("Menyra e pageses nuk u gjet");
        return menyraPageses;
    }

    async create(data) {
        return await this.menyraPagesesRepo.createMenyraPageses(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.menyraPagesesRepo.updateMenyraPageses(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.menyraPagesesRepo.deleteMenyraPageses(id);
    }
}

module.exports = MenyraPagesesService;
