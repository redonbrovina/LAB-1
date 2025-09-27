const express = require('express');
const router = express.Router();
const DozaController = require('../controllers/DozaController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const controller = new DozaController();

// Apply authentication and admin role middleware to all routes
router.use(authenticateToken);
router.use(requireRole('admin'));

router.get('/', controller.getAllDoza.bind(controller));
router.get('/:id', controller.getDozaById.bind(controller));
router.post('/', controller.createDoza.bind(controller));
router.put('/:id', controller.updateDoza.bind(controller));
router.delete('/:id', controller.deleteDoza.bind(controller));

module.exports = router;
