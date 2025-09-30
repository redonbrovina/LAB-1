const { Punetori, Fabrika } = require('../models');

const punetoriController = {
  // Get all workers
  getAllPunetori: async (req, res) => {
    try {
      const punetoret = await Punetori.findAll({
        include: [{
          model: Fabrika,
          as: 'fabrika'
        }]
      });
      res.json(punetoret);
    } catch (error) {
      console.error('Error fetching workers:', error);
      res.status(500).json({ error: 'Failed to fetch workers' });
    }
  },

  // Get worker by ID
  getPunetoriById: async (req, res) => {
    try {
      const { id } = req.params;
      const punetori = await Punetori.findByPk(id, {
        include: [{
          model: Fabrika,
          as: 'fabrika'
        }]
      });
      
      if (!punetori) {
        return res.status(404).json({ error: 'Worker not found' });
      }
      
      res.json(punetori);
    } catch (error) {
      console.error('Error fetching worker:', error);
      res.status(500).json({ error: 'Failed to fetch worker' });
    }
  },

  // Get workers by factory ID
  getPunetoriByFactory: async (req, res) => {
    try {
      const { factoryId } = req.params;
      const punetoret = await Punetori.findAll({
        where: { ID_fabrika: factoryId },
        include: [{
          model: Fabrika,
          as: 'fabrika'
        }]
      });
      res.json(punetoret);
    } catch (error) {
      console.error('Error fetching workers by factory:', error);
      res.status(500).json({ error: 'Failed to fetch workers by factory' });
    }
  },

  // Create new worker
  createPunetori: async (req, res) => {
    try {
      const { Emri, Mbiemri, Pozita, ID_fabrika } = req.body;
      
      if (!Emri || !Mbiemri || !Pozita || !ID_fabrika) {
        return res.status(400).json({ error: 'Emri, Mbiemri, Pozita, and ID_fabrika are required' });
      }

      // Check if factory exists
      const fabrika = await Fabrika.findByPk(ID_fabrika);
      if (!fabrika) {
        return res.status(400).json({ error: 'Factory not found' });
      }

      const punetori = await Punetori.create({
        Emri,
        Mbiemri,
        Pozita,
        ID_fabrika
      });
      
      // Return with factory info
      const punetoriWithFactory = await Punetori.findByPk(punetori.ID, {
        include: [{
          model: Fabrika,
          as: 'fabrika'
        }]
      });
      
      res.status(201).json(punetoriWithFactory);
    } catch (error) {
      console.error('Error creating worker:', error);
      res.status(500).json({ error: 'Failed to create worker' });
    }
  },

  // Update worker
  updatePunetori: async (req, res) => {
    try {
      const { id } = req.params;
      const { Emri, Mbiemri, Pozita, ID_fabrika } = req.body;
      
      const punetori = await Punetori.findByPk(id);
      if (!punetori) {
        return res.status(404).json({ error: 'Worker not found' });
      }

      // If ID_fabrika is being updated, check if factory exists
      if (ID_fabrika) {
        const fabrika = await Fabrika.findByPk(ID_fabrika);
        if (!fabrika) {
          return res.status(400).json({ error: 'Factory not found' });
        }
      }

      await punetori.update({
        Emri: Emri || punetori.Emri,
        Mbiemri: Mbiemri || punetori.Mbiemri,
        Pozita: Pozita || punetori.Pozita,
        ID_fabrika: ID_fabrika || punetori.ID_fabrika
      });
      
      // Return with factory info
      const updatedPunetori = await Punetori.findByPk(id, {
        include: [{
          model: Fabrika,
          as: 'fabrika'
        }]
      });
      
      res.json(updatedPunetori);
    } catch (error) {
      console.error('Error updating worker:', error);
      res.status(500).json({ error: 'Failed to update worker' });
    }
  },

  // Delete worker
  deletePunetori: async (req, res) => {
    try {
      const { id } = req.params;
      
      const punetori = await Punetori.findByPk(id);
      if (!punetori) {
        return res.status(404).json({ error: 'Worker not found' });
      }

      await punetori.destroy();
      res.json({ message: 'Worker deleted successfully' });
    } catch (error) {
      console.error('Error deleting worker:', error);
      res.status(500).json({ error: 'Failed to delete worker' });
    }
  }
};

module.exports = punetoriController;
