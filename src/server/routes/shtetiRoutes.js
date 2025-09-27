const express = require('express');
const router = express.Router();
const ShtetiController = require('../controllers/ShtetiController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const controller = new ShtetiController();

// Apply authentication and admin role middleware to all routes
router.use(authenticateToken);
router.use(requireRole('admin'));

router.get('/', controller.getAllShtetet.bind(controller));
router.get('/:id', controller.getShtetiById.bind(controller));
router.post('/', controller.createShteti.bind(controller));
router.put('/:id', controller.updateShteti.bind(controller));
router.delete('/:id', controller.deleteShteti.bind(controller));

module.exports = router;
