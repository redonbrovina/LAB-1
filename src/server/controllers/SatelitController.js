const SatelitService = require("../services/SatelitService");

class SatelitController {
    constructor() {
        this.satelitService = new SatelitService();
    }

    async getAll(req, res) {
        try {
            const data = await this.satelitService.getAll();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getDeleted(req, res) {
        try {
            const data = await this.satelitService.getDeleted();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await this.satelitService.getById(req.params.id);
            res.json(data);
        } catch (err) {
            if (err.message === "Satellite not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async create(req, res) {
        try {
            const data = await this.satelitService.create(req.body);
            res.status(201).json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const data = await this.satelitService.update(req.params.id, req.body);
            res.json(data);
        } catch (err) {
            if (err.message === "Satellite not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.satelitService.delete(req.params.id);
            res.json({ message: "Satellite deleted successfully" });
        } catch (err) {
            if (err.message === "Satellite not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = SatelitController;
