const Doza = require("../models/Doza");

class DozaRepository {
  async findAll() {
    return await Doza.findAll();
  }

  async findById(id) {
    return await Doza.findByPk(id);
  }

  async create(data) {
    return await Doza.create(data);
  }

  async update(id, data) {
    return await Doza.update(data, { where: { DozaID: id } });
  }

  async delete(id) {
    return await Doza.destroy({ where: { DozaID: id } });
  }
}

module.exports = new DozaRepository();
