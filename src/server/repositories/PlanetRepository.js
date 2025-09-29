const BaseRepository = require('./BaseRepository')
const {Planet} = require('../models')

class PlanetRepository extends BaseRepository {
    constructor(){
        super(Planet)
    }

    async getAllPlanets(){
        return await this.getAll({
            where: {
                isDeleted: 0
            }
        })
    }

    async getPlanetById(planetId) {
        return await this.getById(planetId)
    }

    async createPlanet(data){
        return await this.insert(data)
    } 

    async updatePlanet(id, data){
        return await this.updateById(id, data)
    }

    async deletePlanet(id) {
        return await this.updateById(id, { isDeleted: 1 });
    }
}

module.exports = PlanetRepository