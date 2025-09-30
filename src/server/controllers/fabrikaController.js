const { Fabrika } = require('../models');

const fabrikaController = {
  // Get all factories
  getAllFabrika: async (req, res) => {
    try {
      const fabrikat = await Fabrika.findAll({
        include: [{
          model: require('../models').Punetori,
          as: 'punetoret'
        }]
      });
      res.json(fabrikat);
    } catch (error) {
      console.error('Error fetching factories:', error);
      res.status(500).json({ error: 'Failed to fetch factories' });
    }
  },

  // Get factory by ID
  getFabrikaById: async (req, res) => {
    try {
      const { id } = req.params;
      const fabrika = await Fabrika.findByPk(id, {
        include: [{
          model: require('../models').Punetori,
          as: 'punetoret'
        }]
      });
      
      if (!fabrika) {
        return res.status(404).json({ error: 'Factory not found' });
      }
      
      res.json(fabrika);
    } catch (error) {
      console.error('Error fetching factory:', error);
      res.status(500).json({ error: 'Failed to fetch factory' });
    }
  },

  // Create new factory
  createFabrika: async (req, res) => {
    try {
      const { EmriFabrikes, Lokacioni } = req.body;
      
      if (!EmriFabrikes || !Lokacioni) {
        return res.status(400).json({ error: 'EmriFabrikes and Lokacioni are required' });
      }

      const fabrika = await Fabrika.create({
        EmriFabrikes,
        Lokacioni
      });
      
      res.status(201).json(fabrika);
    } catch (error) {
      console.error('Error creating factory:', error);
      res.status(500).json({ error: 'Failed to create factory' });
    }
  },

  // Update factory
  updateFabrika: async (req, res) => {
    try {
      const { id } = req.params;
      const { EmriFabrikes, Lokacioni } = req.body;
      
      const fabrika = await Fabrika.findByPk(id);
      if (!fabrika) {
        return res.status(404).json({ error: 'Factory not found' });
      }

      await fabrika.update({
        EmriFabrikes: EmriFabrikes || fabrika.EmriFabrikes,
        Lokacioni: Lokacioni || fabrika.Lokacioni
      });
      
      res.json(fabrika);
    } catch (error) {
      console.error('Error updating factory:', error);
      res.status(500).json({ error: 'Failed to update factory' });
    }
  },

  // Delete factory
  deleteFabrika: async (req, res) => {
    try {
      const { id } = req.params;
      
      const fabrika = await Fabrika.findByPk(id);
      if (!fabrika) {
        return res.status(404).json({ error: 'Factory not found' });
      }

      await fabrika.destroy();
      res.json({ message: 'Factory deleted successfully' });
    } catch (error) {
      console.error('Error deleting factory:', error);
      res.status(500).json({ error: 'Failed to delete factory' });
    }
  }
};

module.exports = fabrikaController;
