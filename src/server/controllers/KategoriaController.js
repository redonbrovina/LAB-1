const KategoriaService = require("../services/KategoriaService");

class KategoriaController {
  static async getAll(req, res) {
    try {
      const data = await KategoriaService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await KategoriaService.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Kategoria nuk u gjet" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const data = await KategoriaService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await KategoriaService.update(req.params.id, req.body);
      if (!data) return res.status(404).json({ message: "Kategoria nuk u gjet" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const data = await KategoriaService.delete(req.params.id);
      if (!data) return res.status(404).json({ message: "Kategoria nuk u gjet" });
      res.json({ message: "Kategoria u fshi me sukses" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = KategoriaController;


