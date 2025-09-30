const BaseRepository = require("./BaseRepository");
const { Planeti, Sateliti } = require("../models");

class PlanetiRepository extends BaseRepository {
    constructor() {
        super(Planeti);
    }

    async getAllPlanetet() {
        return await this.getAll({
            where: {
                IsDeleted: false
            },
            include: [
                {
                    model: Sateliti,
                    as: 'satelitet',
                    attributes: ['SatelliteID', 'Name', 'IsDeleted']
                }
            ],
            order: [['Name', 'ASC']]
        });
    }

    async getPlanetiById(planetID) {
        return await this.getOneByField('PlanetID', planetID, {
            include: [
                {
                    model: Sateliti,
                    as: 'satelitet',
                    attributes: ['SatelliteID', 'Name', 'IsDeleted']
                }
            ]
        });
    }

    async createPlaneti(data) {
        return await this.insert(data);
    }

    async updatePlaneti(planetID, data) {
        return await this.updateById(planetID, data);
    }

    async deletePlaneti(planetID) {
        // Soft delete: set IsDeleted to true instead of actually deleting
        return await this.updateById(planetID, { IsDeleted: true });
    }
}

module.exports = PlanetiRepository;
