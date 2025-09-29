const playerRepository = require('../repositories/PlayerRepository');

class PlayerController {
    async getAllPlayers(req, res) {
        try {
            const players = await playerRepository.getAllPlayers();
            res.json(players);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPlayerById(req, res) {
        try {
            const { id } = req.params;
            const player = await playerRepository.getPlayerById(id);
            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }
            res.json(player);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPlayer(req, res) {
        try {
            const playerData = req.body;
            const player = await playerRepository.createPlayer(playerData);
            res.status(201).json(player);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePlayer(req, res) {
        try {
            const { id } = req.params;
            const playerData = req.body;
            const player = await playerRepository.updatePlayer(id, playerData);
            res.json(player);
        } catch (error) {
            if (error.message === 'Player not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async deletePlayer(req, res) {
        try {
            const { id } = req.params;
            await playerRepository.deletePlayer(id);
            res.json({ message: 'Player deleted successfully' });
        } catch (error) {
            if (error.message === 'Player not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async getPlayersByTeam(req, res) {
        try {
            const { teamId } = req.params;
            const players = await playerRepository.getPlayersByTeam(teamId);
            res.json(players);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PlayerController();
