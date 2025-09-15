const BaseRepository = require("./BaseRepository");

class FormaRepository extends BaseRepository {
  constructor() {
    super("Forma", "FormaID");
  }
}

module.exports = new FormaRepository();
