const LevizjaNeStok = require("../models/LevizjaNeStok");

const LevizjaNeStokController = {
  async create(req, res) {
    try {
      const { produktiID, sasia, lloji, data } = req.body;
      const levizja = new LevizjaNeStok({ produktiID, sasia, lloji, data });
      res.status(201).json(levizja);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      res.json([]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      res.json({ id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { produktiID, sasia, lloji, data } = req.body;
      res.json({ id, produktiID, sasia, lloji, data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      res.json({ message: `Deleted ${id}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = LevizjaNeStokController;
