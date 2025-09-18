const FurnitoriService = require("../services/FurnitoriService");

class FurnitoriController {
    constructor() {
        this.furnitoriService = new FurnitoriService();
    }

    async getAll(req, res) {
        try {
            const data = await this.furnitoriService.getAll();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await this.furnitoriService.getById(req.params.id);
            if (!data) return res.status(404).json({ message: "Furnitori nuk u gjet" });
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getByShteti(req, res) {
        try {
            const data = await this.furnitoriService.getByShteti(req.params.shtetiID);
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const data = await this.furnitoriService.create(req.body);
            res.status(201).json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const data = await this.furnitoriService.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ message: "Furnitori nuk u gjet" });
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const data = await this.furnitoriService.delete(req.params.id);
            if (!data) return res.status(404).json({ message: "Furnitori nuk u gjet" });
            res.json({ message: "Furnitori u fshi me sukses" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = FurnitoriController;
