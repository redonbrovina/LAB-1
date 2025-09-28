const express = require('express');
const router = express.Router();
const LigjeruesiController = require('../controllers/LigjeruesiController');

const controller = new LigjeruesiController();

router.get('/', controller.getAllLigjeruesit.bind(controller));
router.get('/:id', controller.getLigjeruesiById.bind(controller));
router.post('/', controller.createLigjeruesi.bind(controller));
router.put('/:id', controller.updateLigjeruesi.bind(controller));
router.delete('/:id', controller.deleteLigjeruesi.bind(controller));

module.exports = router