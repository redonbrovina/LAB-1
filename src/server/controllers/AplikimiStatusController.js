const AplikimiStatusService = require('../services/AplikimiStatusService');

class AplikimiStatusController {
    constructor() {
        this.aplikimiStatusService = new AplikimiStatusService();
    }

    async getAll(req, res) {
        try {
            const statuses = await this.aplikimiStatusService.getAllStatuset();
            return res.status(200).json(statuses);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching application statuses',
                error: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const status = await this.aplikimiStatusService.getStatusById(req.params.id);
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

    async createAplikimiStatus(req, res) {
        try {
            const newStatus = await this.aplikimiStatusService.createStatus(req.body);
            res.status(201).json(newStatus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateAplikimiStatus(req, res) {
        try {
            const updatedStatus = await this.aplikimiStatusService.updateStatus(req.params.id, req.body);
            res.status(200).json(updatedStatus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteAplikimiStatus(req, res) {
        try {
            await this.aplikimiStatusService.deleteStatus(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AplikimiStatusController;
