const KategoriaRepository = require("../repositories/KategoriaRepository");

class KategoriaService {
  async getAll() {
    return await KategoriaRepository.getAll();
  }

  async getById(id) {
    const kategoria = await KategoriaRepository.getById(id);
    if (!kategoria) throw new Error("Kategoria nuk u gjet");
    return kategoria;
  }

  async create(data) {
    return await KategoriaRepository.insert(data);
  }

  async update(id, data) {
    await this.getById(id);
    return await KategoriaRepository.updateById(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await KategoriaRepository.deleteById(id);
  }
}

module.exports = new KategoriaService();
