const BaseRepository = require("./BaseRepository");

class FurnitoriRepository extends BaseRepository {
  constructor() {
    super("furnitori", "FurnitoriID"); 
  }
}

module.exports = new FurnitoriRepository();
