const LevizjaNeStokController = require('../controllers/LevizjaNeStokController');
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Apply authentication middleware
router.use(authenticateToken);

router.get('/', LevizjaNeStokController.getAllLevizjet);
router.get('/:levizjaID', LevizjaNeStokController.getLevizjaById);
router.get('/produkt-variacioni/:produktVariacioniID', LevizjaNeStokController.getLevizjetByProduktVariacioni);
router.get('/porosia/:porosiaID', LevizjaNeStokController.getLevizjetByPorosia);
router.get('/admin/:adminID', LevizjaNeStokController.getLevizjetByAdmin);
router.post('/', LevizjaNeStokController.createLevizja);
router.put('/:levizjaID', LevizjaNeStokController.updateLevizja);
router.delete('/:levizjaID', LevizjaNeStokController.deleteLevizja);

module.exports = router;
