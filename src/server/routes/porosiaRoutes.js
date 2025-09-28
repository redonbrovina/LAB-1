const express = require('express');
const router = express.Router();
const PorosiaController = require('../controllers/PorosiaController');
const { authenticateToken } = require('../middleware/auth');

const controller = new PorosiaController();

router.use(authenticateToken);

// GET routes
router.get('/', controller.getAll.bind(controller));
router.get('/statistics', controller.getOrderStatistics.bind(controller));
router.get('/status/:statusID', controller.getOrdersByStatus.bind(controller));
router.get('/date-range', controller.getOrdersByDateRange.bind(controller));
router.get('/klienti/:klientiID', controller.getPorositeByKlientiID.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.get('/:id/items', controller.getOrderItems.bind(controller));

// POST routes
router.post('/', controller.create.bind(controller));

// PUT routes
router.put('/:id', controller.update.bind(controller));
router.put('/:id/status', controller.updateOrderStatus.bind(controller));

// DELETE routes
router.delete('/:id', controller.delete.bind(controller));

module.exports = router;
