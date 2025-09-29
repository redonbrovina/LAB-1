const express = require("express");
const router = express.Router();
const SatelliteController = require('../controllers/SatelliteController')

const controller = new SatelliteController()

router.get('/', controller.getAllSatellites.bind(controller));
router.get('/:id', controller.getSatelliteByPlanetId.bind(controller));
router.post('/', controller.createSatellite.bind(controller))
router.put('/:id', controller.updateSatellite.bind(controller))
router.put('/delete/:id', controller.deleteSatellite.bind(controller))

module.exports = router