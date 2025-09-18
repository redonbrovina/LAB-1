const MenyraPagesesService = require("../services/MenyraPagesesService");
const service = new MenyraPagesesService();

const MenyraPagesesController = {
  async create(req, res) {
    try {
      const newMenyraPageses = await service.createMenyraPageses(req.body);
      res.status(201).json(newMenyraPageses);
    } catch (err) {
      console.error('Error creating payment method:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const menyraPageses = await service.getAllMenyraPageses();
      // Transform the data to match frontend expectations
      const transformedData = menyraPageses.map(item => ({
        id: item.menyra_pagesesID,
        emri: item.menyra_pageses,
        pershkrimi: item.menyra_pageses // Using the same field for description
      }));
      res.json(transformedData);
    } catch (err) {
      console.error('Error fetching payment methods:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const menyraPageses = await service.getMenyraPagesesById(req.params.id);
      if (!menyraPageses) {
        return res.status(404).json({ message: 'Payment method not found' });
      }
      
      // Transform the data
      const transformedData = {
        id: menyraPageses.menyra_pagesesID,
        emri: menyraPageses.menyra_pageses,
        pershkrimi: menyraPageses.menyra_pageses
      };
      
      res.json(transformedData);
    } catch (err) {
      console.error('Error fetching payment method:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await service.updateMenyraPageses(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: 'Payment method not found' });
      }
      
      // Transform the response
      const transformedData = {
        id: updated.menyra_pagesesID,
        emri: updated.menyra_pageses,
        pershkrimi: updated.menyra_pageses
      };
      
      res.json(transformedData);
    } catch (err) {
      console.error('Error updating payment method:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      console.log('Delete request received for ID:', req.params.id);
      const deleted = await service.deleteMenyraPageses(req.params.id);
      console.log('Delete result:', deleted);
      
      if (!deleted) {
        console.log('Payment method not found for ID:', req.params.id);
        return res.status(404).json({ message: 'Payment method not found' });
      }
      
      console.log('Payment method deleted successfully');
      res.json({ message: 'Payment method deleted successfully' });
    } catch (err) {
      console.error('Error deleting payment method:', err);
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = MenyraPagesesController;
