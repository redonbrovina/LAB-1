const KategoriaRepository = require("../repositories/KategoriaRepository");

class KategoriaService {
  async getAll() {
    return await KategoriaRepository.findAll();
  }

  async getById(id) {
    const kategoria = await KategoriaRepository.findById(id);
    if (!kategoria) throw new Error("Kategoria nuk u gjet");
    return kategoria;
  }

  async create(data) {
    return await KategoriaRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return await KategoriaRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await KategoriaRepository.delete(id);
  }
}

module.exports = new KategoriaService();
