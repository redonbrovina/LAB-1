const ShtetiService = require('../services/ShtetiService');

class ShtetiController {
    constructor() {
        this.shtetiService = new ShtetiService();
    }

    async getAllShtetet(req, res) {
        try {
            const shtetet = await this.shtetiService.getAllShtetet();
            res.status(200).json(shtetet);
        } catch (error) {
            res.status(500).json({ error: error.message });
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