const BaseRepository = require("./BaseRepository");
const { Sateliti, Planeti } = require("../models");

class SatelitRepository extends BaseRepository {
    constructor() {
        super(Sateliti);
    }

    async getAllSatelitet() {
        return await this.getAll({
            where: {
                IsDeleted: false
            },
            include: [
                {
                    model: Planeti,
                    as: 'planeti',
                    attributes: ['PlanetID', 'Name', 'Type']
                }
            ],
            order: [['Name', 'ASC']]
        });
    }

    async getSatelitetDeleted() {
        return await this.model.findAll({
            where: { IsDeleted: true },
            include: [
                {
                    model: Planeti,
                    as: 'planeti',
                    attributes: ['PlanetID', 'Name', 'Type']
                }
            ],
            order: [['Name', 'ASC']]
        });
    }

    async getSatelitById(satelliteID) {
        return await this.getOneByField('SatelliteID', satelliteID, {
            include: [
                {
                    model: Planeti,
                    as: 'planeti',
                    attributes: ['PlanetID', 'Name', 'Type']
                }
            ]
        });
    }

    async createSatelit(data) {
        return await this.insert(data);
    }

    async updateSatelit(satelliteID, data) {
        return await this.updateById(satelliteID, data);
    }

    async deleteSatelit(satelliteID) {
        // Soft delete: set IsDeleted to true instead of actually deleting
        return await this.updateById(satelliteID, { IsDeleted: true });
    }
}

module.exports = SatelitRepository;
