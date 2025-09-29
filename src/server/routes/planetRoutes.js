const express = require("express");
const router = express.Router();
const PlanetController = require('../controllers/PlanetController');

const controller = new PlanetController()

router.get('/', controller.getAllPlanets.bind(controller));
router.post('/', controller.createPlanet.bind(controller))
router.put('/:id', controller.updatePlanet.bind(controller))
router.put('/delete/:id', controller.deletePlanet.bind(controller))

module.exports = router