const express = require('express');
const router = express.Router();
const FabrikaController = require('../controllers/FabrikaController');

const controller = new FabrikaController();

router.get('/', controller.getAllFabrikat.bind(controller));
router.post('/', controller.createFabrika.bind(controller));
router.put('/:id', controller.updateFabrika.bind(controller));
router.delete('/:id', controller.deleteFabrika.bind(controller));

module.exports = router;