const express = require('express');
const router = express.Router();
const MenyraPagesesController = require('../controllers/MenyraPagesesController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', MenyraPagesesController.getAll);
router.get('/:id', MenyraPagesesController.getById);
router.post('/', MenyraPagesesController.create);
router.put('/:id', MenyraPagesesController.update);
router.delete('/:id', MenyraPagesesController.delete);
router.delete('/', MenyraPagesesController.deleteAll);

module.exports = router;