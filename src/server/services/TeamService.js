const TeamRepository = require("../repositories/TeamRepository");

class TeamService {
    constructor() {
        this.teamRepo = new TeamRepository();
    }

    async getAllTeams() {
        return await this.teamRepo.getAllTeams();
    }

    async getTeamById(id) {
        const team = await this.teamRepo.getTeamById(id);
        if (!team) throw new Error("Team not found");
        return team;
    }

    async createTeam(data) {
        return await this.teamRepo.createTeam(data);
    }

    async updateTeam(id, data) {
        await this.getTeamById(id);
        return await this.teamRepo.updateTeam(id, data);
    }

    async deleteTeam(id) {
        await this.getTeamById(id);
        return await this.teamRepo.deleteTeam(id);
    }
}

module.exports = TeamService;
