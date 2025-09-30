const PunetoriService = require('../services/PunetoriService');

class PunetoriController {
    constructor() {
        this.punetoriService = new PunetoriService();
    }

    async getAllPunetoret(req, res) {
        try {
            const punetoret = await this.punetoriService.getAllPunetoret();
            res.status(200).json(punetoret);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async createPunetori(req, res) {
        try {
            const newPunetori = await this.punetoriService.createPunetori(req.body);
            res.status(201).json(newPunetori);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async updatePunetori(req, res) {
        try {
            const updatedPunetori = await this.punetoriService.updatePunetori(req.params.id, req.body);
            res.status(200).json(updatedPunetori);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async deletePunetori(req, res) {
        try {
            await this.punetoriService.deletePunetori(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = PunetoriController;