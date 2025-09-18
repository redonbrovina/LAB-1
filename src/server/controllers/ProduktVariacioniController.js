const ProduktVariacioniService = require("../services/ProduktVariacioniService");

class ProduktVariacioniController {
    constructor() {
        this.variacioniService = new ProduktVariacioniService();
    }

    async getAll(req, res) {
        try {
            const variacione = await this.variacioniService.getAll();
            res.json(variacione);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getVariacioneTePlota(req, res) {
        try {
            const variacione = await this.variacioniService.getVariacioneTePlota();
            res.json(variacione);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const variacioni = await this.variacioniService.getById(req.params.id);
            res.json(variacioni);
        } catch (err) {
            if (err.message === "Variacioni i produktit nuk u gjet") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async create(req, res) {
        try {
            const newVar = await this.variacioniService.create(req.body);
            res.status(201).json(newVar);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updatedVar = await this.variacioniService.update(req.params.id, req.body);
            res.json(updatedVar);
        } catch (err) {
            if (err.message === "Variacioni i produktit nuk u gjet") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.variacioniService.delete(req.params.id);
            res.json({ message: "Variacioni u fshi me sukses" });
        } catch (err) {
            if (err.message === "Variacioni i produktit nuk u gjet") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = ProduktVariacioniController;
