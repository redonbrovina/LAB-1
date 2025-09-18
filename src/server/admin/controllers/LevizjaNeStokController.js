const LevizjaNeStokService = require("../../services/LevizjaNeStokService");
const service = new LevizjaNeStokService();

const LevizjaNeStokController = {
  async create(req, res) {
    try {
      console.log('Create stock movement request received:', req.body);
      const newLevizja = await service.createLevizja(req.body);
      console.log('Stock movement created:', newLevizja);
      res.status(201).json(newLevizja);
    } catch (err) {
      console.error('Error creating stock movement:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const levizje = await service.getAllLevizje();
      // Transform the data to match frontend expectations
      const transformedData = levizje.map(item => ({
        id: item.levizjaID,
        produktiID: item.produkt_variacioniID || 'N/A', // Show N/A if null
        sasia: item.sasia,
        lloji: item.lloji_levizjes,
        data: item.koha_krijimit,
        porosiaID: item.porosiaID,
        adminID: item.adminID
      }));
      res.json(transformedData);
    } catch (err) {
      console.error('Error fetching stock movements:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const levizja = await service.getLevizjaById(req.params.id);
      if (!levizja) {
        return res.status(404).json({ message: 'Stock movement not found' });
      }
      
      // Transform the data
      const transformedData = {
        id: levizja.levizjaID,
        produktiID: levizja.produkt_variacioniID || 'N/A', // Show N/A if null
        sasia: levizja.sasia,
        lloji: levizja.lloji_levizjes,
        data: levizja.koha_krijimit,
        porosiaID: levizja.porosiaID,
        adminID: levizja.adminID
      };
      
      res.json(transformedData);
    } catch (err) {
      console.error('Error fetching stock movement:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      console.log('Update stock movement request received for ID:', req.params.id, req.body);
      const updated = await service.updateLevizja(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: 'Stock movement not found' });
      }
      
      // Transform the response
      const transformedData = {
        id: updated.levizjaID,
        produktiID: updated.produkt_variacioniID || 'N/A', // Show N/A if null
        sasia: updated.sasia,
        lloji: updated.lloji_levizjes,
        data: updated.koha_krijimit,
        porosiaID: updated.porosiaID,
        adminID: updated.adminID
      };
      
      res.json(transformedData);
    } catch (err) {
      console.error('Error updating stock movement:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      console.log('Delete stock movement request received for ID:', req.params.id);
      const deleted = await service.deleteLevizja(req.params.id);
      console.log('Delete result:', deleted);
      
      if (!deleted) {
        console.log('Stock movement not found for ID:', req.params.id);
        return res.status(404).json({ message: 'Stock movement not found' });
      }
      
      console.log('Stock movement deleted successfully');
      res.json({ message: 'Stock movement deleted successfully' });
    } catch (err) {
      console.error('Error deleting stock movement:', err);
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = LevizjaNeStokController;
