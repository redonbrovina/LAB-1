const BaseRepository = require("./BaseRepository");
const { Team, Player } = require("../models");

class TeamRepository extends BaseRepository {
    constructor() {
        super(Team);
    }

    async getAllTeams() {
        return await this.getAll({
            include: [
                {
                    model: Player,
                    as: 'players',
                    attributes: ['PlayerId', 'Name', 'Number', 'BirthYear']
                }
            ],
            order: [['Name', 'ASC']]
        });
    }

    async getTeamById(teamId) {
        return await this.getOneByField('TeamId', teamId, {
            include: [
                {
                    model: Player,
                    as: 'players',
                    attributes: ['PlayerId', 'Name', 'Number', 'BirthYear']
                }
            ]
        });
    }

    async createTeam(data) {
        return await this.insert(data);
    }

    async updateTeam(teamId, data) {
        return await this.updateById(teamId, data);
    }

    async deleteTeam(teamId) {
        return await this.deleteById(teamId);
    }
}

module.exports = TeamRepository;
