const Kategoria = require("../models/Kategoria");

class KategoriaRepository {
  async findAll() {
    return await Kategoria.findAll();
  }

  async findById(id) {
    return await Kategoria.findByPk(id);
  }

  async create(data) {
    return await Kategoria.create(data);
  }

  async update(id, data) {
    return await Kategoria.update(data, { where: { KategoriaID: id } });
  }

  async delete(id) {
    return await Kategoria.destroy({ where: { KategoriaID: id } });
  }
}

module.exports = new KategoriaRepository();
