const LevizjaNeStokController = require('../controllers/LevizjaNeStokController');
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Apply authentication middleware
router.use(authenticateToken);

router.get('/', LevizjaNeStokController.getAllLevizjet);
router.get('/:levizjaID', LevizjaNeStokController.getLevizjaById);
router.post('/', LevizjaNeStokController.createLevizja);
router.put('/:levizjaID', LevizjaNeStokController.updateLevizja);
router.delete('/:levizjaID', LevizjaNeStokController.deleteLevizja);

module.exports = router;
