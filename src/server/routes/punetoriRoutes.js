const express = require('express');
const router = express.Router();
const PunetoriController = require('../controllers/PunetoriController');

const controller = new PunetoriController();

router.get('/', controller.getAllPunetoret.bind(controller));
router.post('/', controller.createPunetori.bind(controller));
router.put('/:id', controller.updatePunetori.bind(controller));
router.delete('/:id', controller.deletePunetori.bind(controller));

module.exports = router;