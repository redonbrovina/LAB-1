const ProduktVariacioniRepository = require("../repositories/ProduktVariacioniRepository");

class ProduktVariacioniService {
  async getAll() {
    return await ProduktVariacioniRepository.findAll();
  }

  async getById(id) {
    const variacioni = await ProduktVariacioniRepository.findById(id);
    if (!variacioni) throw new Error("Variacioni i produktit nuk u gjet");
    return variacioni;
  }

  async create(data) {
    return await ProduktVariacioniRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return await ProduktVariacioniRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await ProduktVariacioniRepository.delete(id);
  }
}

module.exports = new ProduktVariacioniService();
