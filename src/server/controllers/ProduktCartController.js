const ProduktCartService = require('../services/ProduktCartService');

class ProduktCartController {
    constructor() {
        this.repo = new ProduktCartService();
    }

    async getAll(req, res) {
        try {
            console.log('ProduktCartController.getAll called');
            const items = await this.repo.getAll();
            console.log('Cart items retrieved:', items);
            res.json(items);
        } catch (err) {
            console.error('Error in ProduktCartController.getAll:', err);
            console.error('Error details:', err.message);
            console.error('Error stack:', err.stack);
            
            // Return empty array instead of error to prevent frontend crashes
            console.log('Returning empty array due to error');
            res.json([]);
        }
    }

    async getById(req, res) {
        try {
            const item = await this.repo.getById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Produkti nuk u gjet' });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            console.log('ProduktCartController.create called with data:', req.body);
            const newItem = await this.repo.insert(req.body);
            console.log('Cart item created successfully:', newItem);
            res.status(201).json(newItem);
        } catch (err) {
            console.error('Error in ProduktCartController.create:', err);
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updated = await this.repo.updateById(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: 'Produkti nuk u gjet' });
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await this.repo.deleteById(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Product not found' });
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = ProduktCartController;
