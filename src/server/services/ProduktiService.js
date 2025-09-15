const ProduktiRepository = require("../repositories/ProduktiRepository");

class ProduktiService {
  async getAll() {
    return await ProduktiRepository.findAll();
  }

  async getById(id) {
    const produkti = await ProduktiRepository.findById(id);
    if (!produkti) throw new Error("Produkti nuk u gjet");
    return produkti;
  }

  async create(data) {
    return await ProduktiRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id); // sigurohu që ekziston
    return await ProduktiRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await ProduktiRepository.delete(id);
  }
}

module.exports = new ProduktiService();
