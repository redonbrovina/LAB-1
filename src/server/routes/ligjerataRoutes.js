const express = require('express');
const router = express.Router();
const LigjerataController = require('../controllers/LigjerataController');

const controller = new LigjerataController();

router.get('/', controller.getAllLigjeratat.bind(controller));
router.get('/:id', controller.getLigjerataById.bind(controller));
router.post('/', controller.createLigjerata.bind(controller));
router.put('/:id', controller.updateLigjerata.bind(controller));
router.delete('/:id', controller.deleteLigjerata.bind(controller));

module.exports = router