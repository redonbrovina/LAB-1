const express = require('express');
const router = express.Router();
const ProduktCartController = require('../controllers/ProduktCartController');

const controller = new ProduktCartController();

router.get('/', controller.getAll.bind(controller));
router.get('/test', (req, res) => {
    res.json({ message: 'Cart Items API is working', timestamp: new Date().toISOString() });
});
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

module.exports = router;
