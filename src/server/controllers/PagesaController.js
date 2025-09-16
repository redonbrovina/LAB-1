const Pagesa = require("../models/Pagesa");

const PagesaController = {
  async create(req, res) {
    try {
      const { porosiaID, menyra_pagesesID, shuma, status } = req.body;
      const pagesa = new Pagesa({ porosiaID, menyra_pagesesID, shuma, status });
      res.status(201).json(pagesa);
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
      const { shuma, status } = req.body;
      res.json({ id, shuma, status });
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

module.exports = PagesaController;   // ✅ make sure it’s this
