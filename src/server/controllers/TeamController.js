const teamRepository = require('../repositories/TeamRepository');

class TeamController {
    async getAllTeams(req, res) {
        try {
            const teams = await teamRepository.getAllTeams();
            res.json(teams);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTeamById(req, res) {
        try {
            const { id } = req.params;
            const team = await teamRepository.getTeamById(id);
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
            res.json(team);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createTeam(req, res) {
        try {
            const teamData = req.body;
            const team = await teamRepository.createTeam(teamData);
            res.status(201).json(team);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateTeam(req, res) {
        try {
            const { id } = req.params;
            const teamData = req.body;
            const team = await teamRepository.updateTeam(id, teamData);
            res.json(team);
        } catch (error) {
            if (error.message === 'Team not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async deleteTeam(req, res) {
        try {
            const { id } = req.params;
            await teamRepository.deleteTeam(id);
            res.json({ message: 'Team deleted successfully' });
        } catch (error) {
            if (error.message === 'Team not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TeamController();
