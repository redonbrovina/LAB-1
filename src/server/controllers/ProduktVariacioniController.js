const ProduktVariacioniRepository = require("../repositories/ProduktVariacioniRepository");

class ProduktVariacioniController {
  async getAll(req, res) {
    try {
      const variacione = await ProduktVariacioniRepository.getAll();
      res.json(variacione);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const variacioni = await ProduktVariacioniRepository.getById(req.params.id);
      res.json(variacioni);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const newVar = await ProduktVariacioniRepository.create(req.body);
      res.status(201).json(newVar);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updatedVar = await ProduktVariacioniRepository.update(req.params.id, req.body);
      res.json(updatedVar);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await ProduktVariacioniRepository.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ProduktVariacioniController();
