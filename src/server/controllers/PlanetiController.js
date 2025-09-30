const PlanetiService = require("../services/PlanetiService");

class PlanetiController {
    constructor() {
        this.planetiService = new PlanetiService();
    }

    async getAll(req, res) {
        try {
            const data = await this.planetiService.getAllPlanetet();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await this.planetiService.getPlanetiById(req.params.id);
            res.json(data);
        } catch (err) {
            if (err.message === "Planeti not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async create(req, res) {
        try {
            const data = await this.planetiService.createPlaneti(req.body);
            res.status(201).json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const data = await this.planetiService.updatePlaneti(req.params.id, req.body);
            res.json(data);
        } catch (err) {
            if (err.message === "Planeti not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.planetiService.deletePlaneti(req.params.id);
            res.json({ message: "Planeti deleted successfully" });
        } catch (err) {
            if (err.message === "Planeti not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = PlanetiController;
