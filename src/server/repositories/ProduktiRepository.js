const Produkti = require("../models/Produkti");
const Kategoria = require("../models/Kategoria");
const ProduktVariacioni = require("../models/ProduktVariacioni");

class ProduktiRepository {
  async findAll() {
    return await Produkti.findAll({
      include: [Kategoria, ProduktVariacioni]
    });
  }

  async findById(id) {
    return await Produkti.findByPk(id, {
      include: [Kategoria, ProduktVariacioni]
    });
  }

  async create(data) {
    return await Produkti.create(data);
  }

  async update(id, data) {
    return await Produkti.update(data, { where: { ProduktiID: id } });
  }

  async delete(id) {
    return await Produkti.destroy({ where: { ProduktiID: id } });
  }
}

module.exports = new ProduktiRepository();
