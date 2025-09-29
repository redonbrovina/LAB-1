const SatelliteRepository = require('../repositories/SatelliteRepository')

class SatelliteService {
    constructor() {
        this.satelliteRepository = new SatelliteRepository()
    }

    async getAllSatellites() {
        return await this.satelliteRepository.getAllSatellites()
    }

    async getSatelliteById(id){
        return await this.satelliteRepository.getSatelliteById(id)
    }

    async getSatelliteByPlanetId(id){
        return await this.satelliteRepository.getSatelliteByPlanetId(id)
    }

    async createSatellite(data){
        return await this.satelliteRepository.createSatellite(data)
    }

    async updateSatellite(id, data){
        return await this.satelliteRepository.updateSatellite(id, data)
    }

    async deleteSatellite(id){
        return await this.satelliteRepository.deleteSatellite(id)
    }
}

module.exports = SatelliteService