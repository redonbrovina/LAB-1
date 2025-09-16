const BaseRepository = require("./BaseRepository");

class ProduktVariacioniRepository extends BaseRepository {
  constructor() {
    super("produkt_variacioni", "ProduktVariacioniID"); //  tabela me emrin e saktë
  }

  async getVariacioneTePlota() {
    const query = `
      SELECT pv.*, f.emri AS furnitori, d.doza, fo.lloji_formes
      FROM produkt_variacioni pv
      JOIN Furnitori f ON pv.FurnitoriID = f.FurnitoriID
      JOIN Doza d ON pv.DozaID = d.DozaID
      JOIN Forma fo ON pv.FormaID = fo.FormaID
    `;
    return await this.query(query);
  }
}

module.exports = new ProduktVariacioniRepository();
