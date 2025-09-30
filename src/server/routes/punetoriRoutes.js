const express = require('express');
const router = express.Router();
const punetoriController = require('../controllers/punetoriController');

// GET /api/punetori - Get all workers
router.get('/', punetoriController.getAllPunetori);

// GET /api/punetori/factory/:factoryId - Get workers by factory ID
router.get('/factory/:factoryId', punetoriController.getPunetoriByFactory);

// GET /api/punetori/:id - Get worker by ID
router.get('/:id', punetoriController.getPunetoriById);

// POST /api/punetori - Create new worker
router.post('/', punetoriController.createPunetori);

// PUT /api/punetori/:id - Update worker
router.put('/:id', punetoriController.updatePunetori);

// DELETE /api/punetori/:id - Delete worker
router.delete('/:id', punetoriController.deletePunetori);

module.exports = router;
