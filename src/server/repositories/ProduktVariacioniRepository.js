const ProduktVariacioni = require("../models/ProduktVariacioni");
const Forma = require("../models/Forma");
const Doza = require("../models/Doza");
const Furnitori = require("../models/Furnitori");

class ProduktVariacioniRepository {
  async findAll() {
    return await ProduktVariacioni.findAll({
      include: [Forma, Doza, Furnitori]
    });
  }

  async findById(id) {
    return await ProduktVariacioni.findByPk(id, {
      include: [Forma, Doza, Furnitori]
    });
  }

  async create(data) {
    return await ProduktVariacioni.create(data);
  }

  async update(id, data) {
    return await ProduktVariacioni.update(data, { where: { ProduktVariacioniID: id } });
  }

  async delete(id) {
    return await ProduktVariacioni.destroy({ where: { ProduktVariacioniID: id } });
  }
}

module.exports = new ProduktVariacioniRepository();
