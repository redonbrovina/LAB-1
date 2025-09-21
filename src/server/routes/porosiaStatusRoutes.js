const express = require('express');
const router = express.Router();
const PorosiaStatusController = require('../controllers/PorosiaStatusController');
const { authenticateToken } = require('../middleware/auth');

const controller = new PorosiaStatusController();

router.use(authenticateToken);

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

module.exports = router;
