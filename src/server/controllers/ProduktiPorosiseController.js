const ProduktiPorosiseService = require('../services/ProduktiPorosiseService');

class ProduktiPorosiseController {
    constructor() {
        this.service = new ProduktiPorosiseService();
    }

    async getAll(req, res) {
        try {
            const items = await this.service.getAll();
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const item = await this.service.getById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Produkti nuk u gjet' });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const newItem = await this.service.create(req.body);
            res.status(201).json(newItem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updated = await this.service.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: 'Produkti nuk u gjet' });
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await this.service.delete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Product not found' });
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = ProduktiPorosiseController;
