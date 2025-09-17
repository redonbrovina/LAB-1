const AplikimiService = require('../services/AplikimiService');

class AplikimiController {
    constructor() {
        this.aplikimiService = new AplikimiService();
    }

    async getAllAplikimet(req, res) {
        try {
            const aplikimet = await this.aplikimiService.getAllAplikimet();
            return res.status(200).json(aplikimet);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching applications',
                error: error.message
            });
        }
    }

    async getAplikimiById(req, res) {
        try {
            const aplikimi = await this.aplikimiService.getAplikimiById(req.params.aplikimiID);
            return res.status(200).json(aplikimi);
        } catch (error) {
            if (error.message === "Aplikimi nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error fetching application by ID',
                    error: error.message
                });
            }
        }
    }

    async getAplikimiByAplikimiStatusID(req, res) {
        try {
            const aplikimet = await this.aplikimiService.getAplikimiByAplikimiStatusID(req.params.aplikimiStatusID);
            return res.status(200).json(aplikimet);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching applications by status ID',
                error: error.message
            });
        }
    }

    async createAplikimi(req, res) {
        try {
            const newAplikimi = await this.aplikimiService.createAplikimi(req.body);
            return res.status(201).json(newAplikimi);
        } catch (error) {
            res.status(500).json({
                message: 'Error creating application',
                error: error.message
            });
        }
    }

    async updateAplikimi(req, res) {
        try {
            const updatedAplikimi = await this.aplikimiService.updateAplikimi(req.params.aplikimiID, req.body);
            return res.status(200).json(updatedAplikimi);
        } catch (error) {
            if (error.message === "Aplikimi nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error updating application',
                    error: error.message
                });
            }
        }
    }

    async deleteAplikimi(req, res) {
        try {
            await this.aplikimiService.deleteAplikimi(req.params.aplikimiID);
            return res.status(204).send();
        } catch (error) {
            if (error.message === "Aplikimi nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error deleting application',
                    error: error.message
                });
            }
        }
    }
}

module.exports = AplikimiController;