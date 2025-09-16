const BaseRepository = require("./BaseRepository");

class ProduktiRepository extends BaseRepository {
  constructor() {
    super("Produkti", "ProduktiID"); // tabela + primary key
  }
}

module.exports = new ProduktiRepository();
