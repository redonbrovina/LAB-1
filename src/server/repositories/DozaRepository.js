const BaseRepository = require("./BaseRepository");
const { Doza } = require("../models");

class DozaRepository extends BaseRepository {
    constructor() {
        super(Doza);
    }

    async getAllDoza() {
        return await this.getAll();
    }

    async getDozaById(dozaID) {
        return await this.getById(dozaID);
    }

    async createDoza(data) {
        return await this.insert(data);
    }

    async updateDoza(dozaID, data) {
        return await this.updateById(dozaID, data);
    }

    async deleteDoza(dozaID) {
        return await this.deleteById(dozaID);
    }
}

module.exports = DozaRepository;
