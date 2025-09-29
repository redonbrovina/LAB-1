const PlanetService = require('../services/PlanetService')

class PlanetController {
    constructor() {
        this.planetService = new PlanetService()
    }

    async getAllPlanets(req, res) {
        try{
            const planets = await this.planetService.getAllPlanets()
            return res.status(200).json(planets)
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async createPlanet(req, res){
        try{
            const data = req.body
            const newPlanet = await this.planetService.createPlanet(data)

            return res.status(201).json(newPlanet)
        } catch(err){
            return res.status(500).json(err)
        }
    }

    async updatePlanet(req, res){
        try{
            const data = req.body
            const {id} = req.params

            const newPlanet = await this.planetService.updatePlanet(id, data)
            return res.status(200).json(newPlanet)
        } catch(err){
            return res.status(500).json(err)
        }
    }

    async deletePlanet(req, res){
        try{
            const {id} = req.params

            const delPlanet = await this.planetService.deletePlanet(id)
            return res.status(200).json(delPlanet)

        } catch(err){
            return res.status(500).json(err)
        }
    }
}

module.exports = PlanetController