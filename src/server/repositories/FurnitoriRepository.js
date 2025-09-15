const Furnitori = require("../models/Furnitori");

class FurnitoriRepository {
  async findAll() {
    return await Furnitori.findAll();
  }

  async findById(id) {
    return await Furnitori.findByPk(id);
  }

  async create(data) {
    return await Furnitori.create(data);
  }

  async update(id, data) {
    return await Furnitori.update(data, { where: { FurnitoriID: id } });
  }

  async delete(id) {
    return await Furnitori.destroy({ where: { FurnitoriID: id } });
  }
}

module.exports = new FurnitoriRepository();
