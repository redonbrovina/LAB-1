const LigjerataService = require("../services/LigjerataService");

class LigjerataController {
    constructor() {
        this.ligjerataService = new LigjerataService();
    }

    async getAllLigjeratat(req, res) {
        try {
            const ligjeratat = await this.ligjerataService.getAllLigjeratat();
            res.status(200).json(ligjeratat);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async getLigjerataById(req, res) {
        try {
            const ligjerata = await this.ligjerataService.getLigjerataById(req.params.id);
            res.status(200).json(ligjerata);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async createLigjerata(req, res) {
        try {
            const ligjerata = await this.ligjerataService.createLigjerata(req.body);
            res.status(201).json(ligjerata);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async updateLigjerata(req, res) {
        try {
            const ligjerata = await this.ligjerataService.updateLigjerata(req.params.id, req.body);
            res.status(200).json(ligjerata);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async deleteLigjerata(req, res) {
        try {
            await this.ligjerataService.deleteLigjerata(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = LigjerataController;