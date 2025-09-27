const DozaService = require('../services/DozaService');

class DozaController {
    constructor() {
        this.dozaService = new DozaService();
    }

    async getAllDoza(req, res) {
        try {
            const doza = await this.dozaService.getAll();
            res.status(200).json(doza);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDozaById(req, res) {
        try {
            const doza = await this.dozaService.getById(req.params.id);
            res.status(200).json(doza);
        } catch (error) {
            if (error.message === "Doza nuk u gjet") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createDoza(req, res) {
        try {
            const newDoza = await this.dozaService.create(req.body);
            res.status(201).json(newDoza);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async updateDoza(req, res) {
        try {
            const updatedDoza = await this.dozaService.update(req.params.id, req.body);
            res.status(200).json(updatedDoza);
        } catch (error) {
            if (error.message === "Doza nuk u gjet") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
    
    async deleteDoza(req, res) {
        try {
            await this.dozaService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === "Doza nuk u gjet") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = DozaController;
