const TeamService = require("../services/TeamService");

class TeamController {
    constructor() {
        this.teamService = new TeamService();
    }

    async getAll(req, res) {
        try {
            const data = await this.teamService.getAllTeams();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await this.teamService.getTeamById(req.params.id);
            res.json(data);
        } catch (err) {
            if (err.message === "Team not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async create(req, res) {
        try {
            const data = await this.teamService.createTeam(req.body);
            res.status(201).json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const data = await this.teamService.updateTeam(req.params.id, req.body);
            res.json(data);
        } catch (err) {
            if (err.message === "Team not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.teamService.deleteTeam(req.params.id);
            res.json({ message: "Team deleted successfully" });
        } catch (err) {
            if (err.message === "Team not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = TeamController;
