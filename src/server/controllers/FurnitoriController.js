const FurnitoriService = require("../services/FurnitoriService");

class FurnitoriController {
  static async getAll(req, res) {
    try {
      const data = await FurnitoriService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await FurnitoriService.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Furnitori nuk u gjet" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const data = await FurnitoriService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await FurnitoriService.update(req.params.id, req.body);
      if (!data) return res.status(404).json({ message: "Furnitori nuk u gjet" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const data = await FurnitoriService.delete(req.params.id);
      if (!data) return res.status(404).json({ message: "Furnitori nuk u gjet" });
      res.json({ message: "Furnitori u fshi me sukses" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = FurnitoriController;
