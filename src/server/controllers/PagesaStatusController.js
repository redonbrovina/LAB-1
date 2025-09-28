const PagesaStatusService = require('../services/PagesaStatusService');

class PagesaStatusController {
    constructor() {
        this.pagesaStatusService = new PagesaStatusService();
    }

    async getAll(req, res) {
        try {
            const statuses = await this.pagesaStatusService.getAllStatuset();
            return res.status(200).json(statuses);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching payment statuses',
                error: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const status = await this.pagesaStatusService.getStatusById(req.params.id);
            if (!status) {
                return res.status(404).json({ message: 'Status not found' });
            }
            return res.status(200).json(status);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching status by ID',
                error: error.message
            });
        }
    }

    async createPagesaStatus(req, res) {
        try {
            const newStatus = await this.pagesaStatusService.createStatus(req.body);
            res.status(201).json(newStatus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePagesaStatus(req, res) {
        try {
            const updatedStatus = await this.pagesaStatusService.updateStatus(req.params.id, req.body);
            res.status(200).json(updatedStatus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletePagesaStatus(req, res) {
        try {
            await this.pagesaStatusService.deleteStatus(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PagesaStatusController;
