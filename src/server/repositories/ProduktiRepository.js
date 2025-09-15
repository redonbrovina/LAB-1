const BaseRepository = require("./BaseRepository");

class ProduktiRepository extends BaseRepository {
  constructor() {
    super("Produkti", "ProduktiID");
  }

  // shembull: me marrë produkte bashkë me kategorinë
  async getProdukteMeKategori() {
    const query = `
      SELECT p.*, k.emri AS kategoria
      FROM Produkti p
      JOIN Kategoria k ON p.KategoriaID = k.KategoriaID
    `;
    return await this.query(query);
  }
}

module.exports = new ProduktiRepository();
