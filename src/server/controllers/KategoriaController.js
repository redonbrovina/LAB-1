const KategoriaService = require("../services/KategoriaService");

class KategoriaController {
    constructor() {
        this.kategoriaService = new KategoriaService();
    }

    async getAll(req, res) {
        try {
            const data = await this.kategoriaService.getAll();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await this.kategoriaService.getById(req.params.id);
            res.json(data);
        } catch (err) {
            if (err.message === "Category not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async create(req, res) {
        try {
            const data = await this.kategoriaService.create(req.body);
            res.status(201).json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const data = await this.kategoriaService.update(req.params.id, req.body);
            res.json(data);
        } catch (err) {
            if (err.message === "Category not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.kategoriaService.delete(req.params.id);
            res.json({ message: "Category deleted successfully" });
        } catch (err) {
            if (err.message === "Category not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = KategoriaController;


