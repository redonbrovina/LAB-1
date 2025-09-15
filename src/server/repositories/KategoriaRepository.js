const BaseRepository = require("./BaseRepository");

class KategoriaRepository extends BaseRepository {
  constructor() {
    super("Kategoria", "KategoriaID");
  }
}

module.exports = new KategoriaRepository();
