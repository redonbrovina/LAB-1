const express = require('express');
const router = express.Router();
const FormaController = require('../controllers/FormaController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const controller = new FormaController();

// Apply authentication and admin role middleware to all routes
router.use(authenticateToken);
router.use(requireRole('admin'));

router.get('/', controller.getAllForma.bind(controller));
router.get('/:id', controller.getFormaById.bind(controller));
router.post('/', controller.createForma.bind(controller));
router.put('/:id', controller.updateForma.bind(controller));
router.delete('/:id', controller.deleteForma.bind(controller));

module.exports = router;
