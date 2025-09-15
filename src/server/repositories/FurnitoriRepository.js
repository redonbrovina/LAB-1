const BaseRepository = require("./BaseRepository");

class FurnitoriRepository extends BaseRepository {
  constructor() {
    super("Furnitori", "FurnitoriID");
  }
}

module.exports = new FurnitoriRepository();
