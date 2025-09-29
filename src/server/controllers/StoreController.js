const Store = require('../models/Store');
const Product = require('../models/Product');

class StoreController {
  // Get all stores
  static async getAllStores(req, res) {
    try {
      const stores = await Store.findAll({
        order: [['StoreId', 'ASC']]
      });
      res.json(stores);
    } catch (error) {
      console.error('Error fetching stores:', error);
      res.status(500).json({ message: 'Error fetching stores' });
    }
  }

  // Get store by ID
  static async getStoreById(req, res) {
    try {
      const { id } = req.params;
      const store = await Store.findByPk(id);
      
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }
      
      res.json(store);
    } catch (error) {
      console.error('Error fetching store:', error);
      res.status(500).json({ message: 'Error fetching store' });
    }
  }

  // Create new store
  static async createStore(req, res) {
    try {
      const { StoreName, Location } = req.body;
      
      if (!StoreName || !Location) {
        return res.status(400).json({ message: 'StoreName and Location are required' });
      }

      const store = await Store.create({
        StoreName,
        Location
      });

      res.status(201).json(store);
    } catch (error) {
      console.error('Error creating store:', error);
      res.status(500).json({ message: 'Error creating store' });
    }
  }

  // Update store
  static async updateStore(req, res) {
    try {
      const { id } = req.params;
      const { StoreName, Location } = req.body;

      const store = await Store.findByPk(id);
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      await store.update({
        StoreName: StoreName || store.StoreName,
        Location: Location || store.Location
      });

      res.json(store);
    } catch (error) {
      console.error('Error updating store:', error);
      res.status(500).json({ message: 'Error updating store' });
    }
  }

  // Delete store
  static async deleteStore(req, res) {
    try {
      const { id } = req.params;
      
      const store = await Store.findByPk(id);
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      await store.destroy();
      res.json({ message: 'Store deleted successfully' });
    } catch (error) {
      console.error('Error deleting store:', error);
      res.status(500).json({ message: 'Error deleting store' });
    }
  }

  // Get store with their products
  static async getStoreWithProducts(req, res) {
    try {
      const { id } = req.params;
      
      const store = await Store.findByPk(id, {
        include: [{
          model: Product,
          as: 'products'
        }]
      });

      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      res.json(store);
    } catch (error) {
      console.error('Error fetching store with products:', error);
      res.status(500).json({ message: 'Error fetching store with products' });
    }
  }
}

module.exports = StoreController;
