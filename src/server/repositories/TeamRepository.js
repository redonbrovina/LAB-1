const BaseRepository = require('./BaseRepository');
const { Team } = require('../models');

class TeamRepository extends BaseRepository {
    constructor() {
        super(Team);
    }

    async getAllTeams() {
        return await this.model.findAll({
            include: [{
                model: require('../models').Player,
                as: 'players'
            }]
        });
    }

    async getTeamById(id) {
        return await this.model.findByPk(id, {
            include: [{
                model: require('../models').Player,
                as: 'players'
            }]
        });
    }

    async createTeam(teamData) {
        return await this.model.create(teamData);
    }

    async updateTeam(id, teamData) {
        const team = await this.model.findByPk(id);
        if (!team) {
            throw new Error('Team not found');
        }
        return await team.update(teamData);
    }

    async deleteTeam(id) {
        const team = await this.model.findByPk(id);
        if (!team) {
            throw new Error('Team not found');
        }
        return await team.destroy();
    }
}

module.exports = new TeamRepository();
