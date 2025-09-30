const PlayerService = require("../services/PlayerService");

class PlayerController {
    constructor() {
        this.playerService = new PlayerService();
    }

    async getAll(req, res) {
        try {
            const data = await this.playerService.getAll();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await this.playerService.getById(req.params.id);
            res.json(data);
        } catch (err) {
            if (err.message === "Player not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async create(req, res) {
        try {
            const data = await this.playerService.create(req.body);
            res.status(201).json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const data = await this.playerService.update(req.params.id, req.body);
            res.json(data);
        } catch (err) {
            if (err.message === "Player not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.playerService.delete(req.params.id);
            res.json({ message: "Player deleted successfully" });
        } catch (err) {
            if (err.message === "Player not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = PlayerController;
