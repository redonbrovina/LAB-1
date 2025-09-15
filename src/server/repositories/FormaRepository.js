const Forma = require("../models/Forma");

class FormaRepository {
  async findAll() {
    return await Forma.findAll();
  }

  async findById(id) {
    return await Forma.findByPk(id);
  }

  async create(data) {
    return await Forma.create(data);
  }

  async update(id, data) {
    return await Forma.update(data, { where: { FormaID: id } });
  }

  async delete(id) {
    return await Forma.destroy({ where: { FormaID: id } });
  }
}

module.exports = new FormaRepository();
