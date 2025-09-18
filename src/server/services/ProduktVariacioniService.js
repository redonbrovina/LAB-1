const ProduktVariacioniRepository = require("../repositories/ProduktVariacioniRepository");

class ProduktVariacioniService {
    constructor() {
        this.variacioniRepo = new ProduktVariacioniRepository();
    }

    async getAll() {
        return await this.variacioniRepo.getAllVariacione();
    }

    async getVariacioneTePlota() {
        return await this.variacioniRepo.getVariacioneTePlota();
    }

    async getById(id) {
        const variacioni = await this.variacioniRepo.getVariacioniById(id);
        if (!variacioni) throw new Error("Variacioni i produktit nuk u gjet");
        return variacioni;
    }

    async create(data) {
        return await this.variacioniRepo.createVariacioni(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.variacioniRepo.updateVariacioni(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.variacioniRepo.deleteVariacioni(id);
    }
}

module.exports = ProduktVariacioniService;
