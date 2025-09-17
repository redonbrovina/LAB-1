const BaseRepository = require("./BaseRepository");

class KategoriaRepository extends BaseRepository {
  constructor() {
    super("kategoria", "kategoriaID");
  }
}

module.exports = new KategoriaRepository();
