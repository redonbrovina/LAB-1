const db = require('../database/Database');

class LevizjaNeStokModel {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Levizja_ne_stok ORDER BY LevizjaID DESC');
    return rows;
  }

  static async create(produktVariacioniId, lloj, sasia, porosiaId, adminId) {
    const [result] = await db.query(
      `INSERT INTO Levizja_ne_stok 
       (ProduktVariacioniID, lloji_levizjes, sasia, koha_krijimit, PorosiaID, AdminID)
       VALUES (?, ?, ?, NOW(), ?, ?)`,
      [produktVariacioniId, lloj, sasia, porosiaId || null, adminId || null]
    );
    return { id: result.insertId, produktVariacioniId, lloj, sasia, porosiaId, adminId };
  }
}

module.exports = LevizjaNeStokModel;
