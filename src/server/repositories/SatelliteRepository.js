const BaseRepository = require('./BaseRepository')
const {Planet, Satellite} = require('../models')

class SatelliteRepository extends BaseRepository {
    constructor(){
        super(Satellite)
    }

    async getAllSatellites(){
        return await this.getAll({
            include: [{
                model: Planet,
                as: 'Planet',
                attributes: ['Name']
            }],
            where: {
                isDeleted: 0
            }
        })
    }

    async getSatelliteById(id) {
        return await this.getById(id)
    }

    async getSatelliteByPlanetId(id){
        return await this.getByField('PlanetId', id, {
            include: [{
                model: Planet,
                as: 'Planet',
                attributes: ['Name']
            }],
            where: {
                isDeleted: 0
            }
        })
    }

    async createSatellite(data){
        return await this.insert(data)
    } 

    async updateSatellite(id, data){
        return await this.updateById(id, data)
    }

    async deleteSatellite(id){
        return await this.updateById(id, {isDeleted: 1})
    }
}

module.exports = SatelliteRepository