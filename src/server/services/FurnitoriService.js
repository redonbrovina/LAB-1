const FurnitoriRepository = require("../repositories/FurnitoriRepository");

class FurnitoriService {
  async getAll() {
    return await FurnitoriRepository.findAll();
  }

  async getById(id) {
    const furnitori = await FurnitoriRepository.findById(id);
    if (!furnitori) throw new Error("Furnitori nuk u gjet");
    return furnitori;
  }

  async create(data) {
    return await FurnitoriRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return await FurnitoriRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await FurnitoriRepository.delete(id);
  }
}

module.exports = new FurnitoriService();
