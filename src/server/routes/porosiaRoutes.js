const express = require('express');
const router = express.Router();
const PorosiaController = require('../controllers/PorosiaController');
const { authenticateToken } = require('../middleware/auth');

const controller = new PorosiaController();

router.use(authenticateToken);

router.get('/', controller.getAll.bind(controller));
router.get('/klienti/:klientiID', controller.getPorositeByKlientiID.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

module.exports = router;
