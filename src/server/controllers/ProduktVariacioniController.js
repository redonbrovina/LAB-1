const ProduktVariacioniService = require("../services/ProduktVariacioniService");

class ProduktVariacioniController {
  static async getAll(req, res) {
    try {
      const data = await ProduktVariacioniService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await ProduktVariacioniService.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Variacioni nuk u gjet" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const data = await ProduktVariacioniService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await ProduktVariacioniService.update(req.params.id, req.body);
      if (!data) return res.status(404).json({ message: "Variacioni nuk u gjet" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const data = await ProduktVariacioniService.delete(req.params.id);
      if (!data) return res.status(404).json({ message: "Variacioni nuk u gjet" });
      res.json({ message: "Variacioni u fshi me sukses" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ProduktVariacioniController;
