const MenyraPageses = require("../models/MenyraPageses");

const MenyraPagesesController = {
  async create(req, res) {
    try {
      const { emri, pershkrimi } = req.body;
      const menyraPageses = new MenyraPageses({ emri, pershkrimi });
      res.status(201).json(menyraPageses);
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
      const { emri, pershkrimi } = req.body;
      res.json({ id, emri, pershkrimi });
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

module.exports = MenyraPagesesController;
