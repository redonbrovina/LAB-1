const express = require('express');
const router = express.Router();
const LevizjaNeStokController = require('../controllers/LevizjaNeStokController');

router.get('/', LevizjaNeStokController.getAll);
router.get('/:id', LevizjaNeStokController.getById);
router.post('/', LevizjaNeStokController.create);
router.put('/:id', LevizjaNeStokController.update);
router.delete('/:id', LevizjaNeStokController.delete);

module.exports = router;
