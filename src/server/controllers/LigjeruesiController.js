const LigjeruesiService = require("../services/LigjeruesiService");

class LigjeruesiController {
    constructor() {
        this.ligjeruesiService = new LigjeruesiService();
    }

    async getAllLigjeruesit(req, res) {
        try {
            const ligjeruesit = await this.ligjeruesiService.getAllLigjeruesit();
            res.status(200).json(ligjeruesit);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async getLigjeruesiById(req, res) {
        try {
            const ligjeruesi = await this.ligjeruesiService.getLigjeruesiById(req.params.id);
            res.status(200).json(ligjeruesi);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async createLigjeruesi(req, res) {
        try {
            const ligjeruesi = await this.ligjeruesiService.createLigjeruesi(req.body);
            res.status(201).json(ligjeruesi);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
 
    async updateLigjeruesi(req, res) {
        try {
            const ligjeruesi = await this.ligjeruesiService.updateLigjeruesi(req.params.id, req.body);
            res.status(200).json('Edited successfully', ligjeruesi);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async deleteLigjeruesi(req, res) {
        try {
            await this.ligjeruesiService.deleteLigjeruesi(req.params.id);
            res.status(204).send('Deleted successfully');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = LigjeruesiController;