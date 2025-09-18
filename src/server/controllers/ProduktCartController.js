const BaseRepository = require('../repositories/ProduktCartRepository');

class ProduktCartController {
    constructor() {
        this.repo = new BaseRepository();
    }

    async getAll(req, res) {
        try {
            const items = await this.repo.getAll();
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
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
            const newItem = await this.repo.insert(req.body);
            res.status(201).json(newItem);
        } catch (err) {
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
            if (!deleted) return res.status(404).json({ message: 'Produkti nuk u gjet' });
            res.json({ message: 'Produkti u fshi me sukses' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = ProduktCartController;
