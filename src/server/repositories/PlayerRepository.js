const BaseRepository = require('./BaseRepository');
const { Player, Team } = require('../models');

class PlayerRepository extends BaseRepository {
    constructor() {
        super(Player);
    }

    async getAllPlayers() {
        return await this.model.findAll({
            include: [{
                model: Team,
                as: 'team'
            }]
        });
    }

    async getPlayerById(id) {
        return await this.model.findByPk(id, {
            include: [{
                model: Team,
                as: 'team'
            }]
        });
    }

    async createPlayer(playerData) {
        return await this.model.create(playerData);
    }

    async updatePlayer(id, playerData) {
        const player = await this.model.findByPk(id);
        if (!player) {
            throw new Error('Player not found');
        }
        return await player.update(playerData);
    }

    async deletePlayer(id) {
        const player = await this.model.findByPk(id);
        if (!player) {
            throw new Error('Player not found');
        }
        return await player.destroy();
    }

    async getPlayersByTeam(teamId) {
        return await this.model.findAll({
            where: { TeamId: teamId },
            include: [{
                model: Team,
                as: 'team'
            }]
        });
    }
}

module.exports = new PlayerRepository();
