const PlayerRepository = require("../repositories/PlayerRepository");

class PlayerService {
    constructor() {
        this.playerRepo = new PlayerRepository();
    }

    async getAll() {
        return await this.playerRepo.getAllPlayers();
    }

    async getById(id) {
        const player = await this.playerRepo.getPlayerById(id);
        if (!player) throw new Error("Player not found");
        return player;
    }

    async create(data) {
        return await this.playerRepo.createPlayer(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.playerRepo.updatePlayer(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.playerRepo.deletePlayer(id);
    }
}

module.exports = PlayerService;
