const FormaRepository = require("../repositories/FormaRepository");

class FormaService {
  async getAll() {
    return await FormaRepository.findAll();
  }

  async getById(id) {
    const forma = await FormaRepository.findById(id);
    if (!forma) throw new Error("Forma nuk u gjet");
    return forma;
  }

  async create(data) {
    return await FormaRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return await FormaRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await FormaRepository.delete(id);
  }
}

module.exports = new FormaService();
