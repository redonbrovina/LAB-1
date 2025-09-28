const ShtetiService = require('../services/ShtetiService');

class ShtetiController {
    constructor() {
        this.shtetiService = new ShtetiService();
    }

    async getAllShtetet(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            
            const result = await this.shtetiService.getAllShtetetPaginated(page, limit);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getShtetiById(req, res) {
        try {
            const shteti = await this.shtetiService.getShtetiById(req.params.id);
            res.status(200).json(shteti);
        } catch (error) {
            if (error.message === "Country not found") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createShteti(req, res) {
        try {
            const newShteti = await this.shtetiService.createShteti(req.body);
            res.status(201).json(newShteti);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async updateShteti(req, res) {
        try {
            const updatedShteti = await this.shtetiService.updateShteti(req.params.id, req.body);
            res.status(200).json(updatedShteti);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async deleteShteti(req, res) {
        try {
            await this.shtetiService.deleteShteti(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ShtetiController;