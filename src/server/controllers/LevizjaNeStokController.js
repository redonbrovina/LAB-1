const LevizjaNeStokService = require('../services/LevizjaNeStokService');

const service = new LevizjaNeStokService();

const LevizjaNeStokController = {
    async getAllLevizjet(req, res) {
        try {
            const levizjet = await service.getAll();
            return res.status(200).json(levizjet);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching stock movements',
                error: error.message
            });
        }
    },

    async getLevizjaById(req, res) {
        try {
            const levizja = await service.getById(req.params.levizjaID);
            return res.status(200).json(levizja);
        } catch (error) {
            if (error.message === "Levizja nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error fetching stock movement by ID',
                    error: error.message
                });
            }
        }
    },

    async createLevizja(req, res) {
        try {
            const newLevizja = await service.create(req.body);
            return res.status(201).json(newLevizja);
        } catch (error) {
            res.status(500).json({
                message: 'Error creating stock movement',
                error: error.message
            });
        }
    },

    async updateLevizja(req, res) {
        try {
            const updatedLevizja = await service.update(req.params.levizjaID, req.body);
            return res.status(200).json(updatedLevizja);
        } catch (error) {
            if (error.message === "Levizja nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error updating stock movement',
                    error: error.message
                });
            }
        }
    },

    async deleteLevizja(req, res) {
        try {
            await service.delete(req.params.levizjaID);
            return res.status(204).send();
        } catch (error) {
            if (error.message === "Levizja nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error deleting stock movement',
                    error: error.message
                });
            }
        }
    },

    async getLevizjetByProduktVariacioni(req, res) {
        try {
            const { produktVariacioniID } = req.params;
            const levizjet = await service.getByProduktVariacioni(produktVariacioniID);
            return res.status(200).json(levizjet);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching stock movements by product variation',
                error: error.message
            });
        }
    },

    async getLevizjetByPorosia(req, res) {
        try {
            const { porosiaID } = req.params;
            const levizjet = await service.getByPorosia(porosiaID);
            return res.status(200).json(levizjet);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching stock movements by order',
                error: error.message
            });
        }
    },

    async getLevizjetByAdmin(req, res) {
        try {
            const { adminID } = req.params;
            const levizjet = await service.getByAdmin(adminID);
            return res.status(200).json(levizjet);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching stock movements by admin',
                error: error.message
            });
        }
    }
};

module.exports = LevizjaNeStokController;
