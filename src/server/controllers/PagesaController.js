const Pagesa = require("../models/Pagesa");
const BaseRepository = require("../repositories/BaseRepository");

const PagesaController = {
  async create(req, res) {
    try {
      const { porosiaID, menyra_pagesesID, shuma, status } = req.body;
      const pagesa = new Pagesa({ porosiaID, menyra_pagesesID, shuma, status });
      
      // For now, just return the created object
      // In a real implementation, you'd save it to the database
      res.status(201).json(pagesa);
    } catch (err) {
      console.error('Error creating payment:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      // For now, return empty array
      // In a real implementation, you'd fetch from database
      res.json([]);
    } catch (err) {
      console.error('Error fetching payments:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      // For now, return mock data
      res.json({ 
        id: id,
        porosiaID: 1,
        menyra_pagesesID: 1,
        shuma: 100.00,
        status: 'pending'
      });
    } catch (err) {
      console.error('Error fetching payment:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { shuma, status } = req.body;
      // For now, return mock updated data
      res.json({ 
        id: id, 
        shuma: shuma || 100.00, 
        status: status || 'pending' 
      });
    } catch (err) {
      console.error('Error updating payment:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      res.json({ message: `Payment ${id} deleted successfully` });
    } catch (err) {
      console.error('Error deleting payment:', err);
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = PagesaController;   // ✅ make sure it’s this
