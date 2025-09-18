const BaseRepository = require("./BaseRepository");
const { PorosiaStatus } = require("../models");

class PorosiaStatusRepository extends BaseRepository {
    constructor() {
        super(PorosiaStatus);
    }

    async getAllStatuset() {
        return await this.getAll({
            order: [['statusi', 'ASC']]
        });
    }

    async getStatusById(statusID) {
        return await this.getOneByField('porosia_statusID', statusID);
    }

    async createStatus(data) {
        return await this.insert(data);
    }

    async updateStatus(statusID, data) {
        return await this.updateById(statusID, data);
    }

    async deleteStatus(statusID) {
        return await this.deleteById(statusID);
    }
}

module.exports = PorosiaStatusRepository;