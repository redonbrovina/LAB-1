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
}

module.exports = AplikimiStatusController;
