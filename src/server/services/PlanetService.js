const PlanetRepository = require('../repositories/PlanetRepository')

class PlanetService {
    constructor() {
        this.planetRepository = new PlanetRepository()
    }

    async getAllPlanets() {
        return await this.planetRepository.getAllPlanets()
    }

    async getPlanetById(id){
        return await this.planetRepository.getPlanetById(id)
    }

    async createPlanet(data){
        return await this.planetRepository.createPlanet(data)
    }

    async updatePlanet(id, data){
        return await this.planetRepository.updatePlanet(id, data)
    }

    async deletePlanet(id){
        return await this.planetRepository.deletePlanet(id)
    }
}

module.exports = PlanetService