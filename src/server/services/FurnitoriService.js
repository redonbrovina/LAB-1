const FurnitoriRepository = require("../repositories/FurnitoriRepository");

class FurnitoriService {
  async getAll() {
    return await FurnitoriRepository.getAll(); 
  }

  async getById(id) {
    return await FurnitoriRepository.getById(id);
  }

  async create(data) {
    return await FurnitoriRepository.create(data);
  }

  async update(id, data) {
    return await FurnitoriRepository.update(id, data);
  }

  async delete(id) {
    return await FurnitoriRepository.delete(id);
  }
}

module.exports = new FurnitoriService();
