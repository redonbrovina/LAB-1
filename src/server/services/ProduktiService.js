const ProduktiRepository = require("../repositories/ProduktiRepository");

class ProduktiService {
  async getAll() {
    return await ProduktiRepository.getAll(); // jo findAll
  }

  async getById(id) {
    const produkti = await ProduktiRepository.getById(id); // jo findById
    if (!produkti) throw new Error("Produkti nuk u gjet");
    return produkti;
  }

  async create(data) {
    return await ProduktiRepository.insert(data); // jo create
  }

  async update(id, data) {
    await this.getById(id); // sigurohu që ekziston
    return await ProduktiRepository.updateById(id, data); // jo update
  }

  async delete(id) {
    await this.getById(id);
    return await ProduktiRepository.deleteById(id); // jo delete
  }
}

module.exports = new ProduktiService();
