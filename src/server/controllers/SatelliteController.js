const SatelliteService = require('../services/SatelliteService')

class SatelliteController {
    constructor() {
        this.satelliteService = new SatelliteService()
    }

    async getAllSatellites(req, res) {
        try{
            const satellites = await this.satelliteService.getAllSatellites()
            return res.status(200).json(satellites)
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async createSatellite(req, res){
        try{
            const data = req.body
            const newSatellite = await this.satelliteService.createSatellite(data)

            return res.status(201).json(newSatellite)
        } catch(err){
            return res.status(500).json(err)
        }
    }

    async updateSatellite(req, res){
        try{
            const data = req.body
            const {id} = req.params

            const newSatellite = await this.satelliteService.updateSatellite(id, data)
            return res.status(200).json(newSatellite)
        } catch(err){
            return res.status(500).json(err)
        }
    }

    async deleteSatellite(req, res){
        try{
            const {id} = req.params

            const delSatellite = await this.satelliteService.deleteSatellite(id)
            return res.status(200).json(delSatellite)

        } catch(err){
            return res.status(500).json(err)
        }
    }

    async getSatelliteByPlanetId(req, res){
        try{
            const {id} = req.params
            const satellites = await this.satelliteService.getSatelliteByPlanetId(id)
            return res.status(200).json(satellites)
        } catch(err){
            return res.status(500).json(err)
        }
    }
}

module.exports = SatelliteController