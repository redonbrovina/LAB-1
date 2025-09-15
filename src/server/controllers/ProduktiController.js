const ProduktiService = require("../services/ProduktiService");

class ProduktiController {
  static async getAll(req, res) {
    try {
      const data = await ProduktiService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await ProduktiService.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Produkti nuk u gjet" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const data = await ProduktiService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await ProduktiService.update(req.params.id, req.body);
      if (!data) return res.status(404).json({ message: "Produkti nuk u gjet" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const data = await ProduktiService.delete(req.params.id);
      if (!data) return res.status(404).json({ message: "Produkti nuk u gjet" });
      res.json({ message: "Produkti u fshi me sukses" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ProduktiController;
