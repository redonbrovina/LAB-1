const FormaService = require('../services/FormaService');

class FormaController {
    constructor() {
        this.formaService = new FormaService();
    }

    async getAllForma(req, res) {
        try {
            const forma = await this.formaService.getAll();
            res.status(200).json(forma);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getFormaById(req, res) {
        try {
            const forma = await this.formaService.getById(req.params.id);
            res.status(200).json(forma);
        } catch (error) {
            if (error.message === "Forma nuk u gjet") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createForma(req, res) {
        try {
            const newForma = await this.formaService.create(req.body);
            res.status(201).json(newForma);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async updateForma(req, res) {
        try {
            const updatedForma = await this.formaService.update(req.params.id, req.body);
            res.status(200).json(updatedForma);
        } catch (error) {
            if (error.message === "Forma nuk u gjet") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
    
    async deleteForma(req, res) {
        try {
            await this.formaService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === "Forma nuk u gjet") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = FormaController;
