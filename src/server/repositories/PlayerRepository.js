const BaseRepository = require("./BaseRepository");
const { Player, Team } = require("../models");

class PlayerRepository extends BaseRepository {
    constructor() {
        super(Player);
    }

    async getAllPlayers() {
        return await this.getAll({
            include: [
                {
                    model: Team,
                    as: 'team',
                    attributes: ['TeamId', 'Name']
                }
            ],
            order: [['Name', 'ASC']]
        });
    }

    async getPlayerById(playerId) {
        return await this.getOneByField('PlayerId', playerId, {
            include: [
                {
                    model: Team,
                    as: 'team',
                    attributes: ['TeamId', 'Name']
                }
            ]
        });
    }

    async createPlayer(data) {
        return await this.insert(data);
    }

    async updatePlayer(playerId, data) {
        return await this.updateById(playerId, data);
    }

    async deletePlayer(playerId) {
        return await this.deleteById(playerId);
    }
}

module.exports = PlayerRepository;
