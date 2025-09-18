const BaseRepository = require("./BaseRepository");
const { AplikimiStatus } = require("../models");

class AplikimiStatusRepository extends BaseRepository {
    constructor() {
        super(AplikimiStatus);
    }

    async getAllStatuset() {
        return await this.getAll({
            order: [['statusi', 'ASC']]
        });
    }

    async getStatusById(statusID) {
        return await this.getOneByField('aplikimi_statusID', statusID);
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

module.exports = AplikimiStatusRepository;
