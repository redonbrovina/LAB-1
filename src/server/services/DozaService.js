const DozaRepository = require("../repositories/DozaRepository");

class DozaService {
  async getAll() {
    return await DozaRepository.findAll();
  }

  async getById(id) {
    const doza = await DozaRepository.findById(id);
    if (!doza) throw new Error("Doza nuk u gjet");
    return doza;
  }

  async create(data) {
    return await DozaRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return await DozaRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await DozaRepository.delete(id);
  }
}

module.exports = new DozaService();
