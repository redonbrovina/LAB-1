const PorosiaStatusService = require('../services/PorosiaStatusService');

class PorosiaStatusController {
    constructor() {
        this.statusService = new PorosiaStatusService();
    }

    async getAll(req, res) {
        try {
            const statuset = await this.statusService.getAll();
            res.json(statuset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const status = await this.statusService.getById(req.params.id);
            res.json(status);
        } catch (err) {
            if (err.message === "Statusi i porosise nuk u gjet") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async create(req, res) {
        try {
            const newStatus = await this.statusService.create(req.body);
            res.status(201).json(newStatus);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updated = await this.statusService.update(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            if (err.message === "Statusi i porosise nuk u gjet") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.statusService.delete(req.params.id);
            res.json({ message: "Statusi u fshi me sukses" });
        } catch (err) {
            if (err.message === "Statusi i porosise nuk u gjet") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = PorosiaStatusController;
