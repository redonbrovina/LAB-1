const BaseRepository = require("./BaseRepository");

class ProduktiRepository extends BaseRepository {
  constructor() {
    super("produkti", "produktiID"); // tabela + primary key
  }
}

module.exports = new ProduktiRepository();
