const { Fabrika } = require('../models');
const FabrikaService = require('../services/FabrikaService');

class FabrikaController {
    constructor() {
        this.fabrikaService = new FabrikaService();
    }

    async getAllFabrikat(req, res) {
        try {
            const fabrikat = await this.fabrikaService.getAllFabrikat();
            res.status(200).json(fabrikat);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async createFabrika(req, res) {
        try {
            const newFabrika = await this.fabrikaService.createFabrika(req.body);
            res.status(201).json(newFabrika);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async updateFabrika(req, res) {
        try {
            const updatedFabrika = await this.fabrikaService.updateFabrika(req.params.id, req.body);
            res.status(200).json(updatedFabrika);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async deleteFabrika(req, res) {
        try {
            await this.fabrikaService.deleteFabrika(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = FabrikaController;