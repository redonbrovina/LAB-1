const express = require('express');
const router = express.Router();
const fabrikaController = require('../controllers/fabrikaController');

// GET /api/fabrika - Get all factories
router.get('/', fabrikaController.getAllFabrika);

// GET /api/fabrika/:id - Get factory by ID
router.get('/:id', fabrikaController.getFabrikaById);

// POST /api/fabrika - Create new factory
router.post('/', fabrikaController.createFabrika);

// PUT /api/fabrika/:id - Update factory
router.put('/:id', fabrikaController.updateFabrika);

// DELETE /api/fabrika/:id - Delete factory
router.delete('/:id', fabrikaController.deleteFabrika);

module.exports = router;
