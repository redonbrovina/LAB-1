const express = require('express');
const router = express.Router();
const AplikimiStatusController = require('../controllers/AplikimiStatusController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const controller = new AplikimiStatusController();

router.use(authenticateToken);
router.use(requireRole('admin'));

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.createAplikimiStatus.bind(controller));
router.put('/:id', controller.updateAplikimiStatus.bind(controller));
router.delete('/:id', controller.deleteAplikimiStatus.bind(controller));

module.exports = router;
