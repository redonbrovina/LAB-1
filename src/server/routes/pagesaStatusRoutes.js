const express = require('express');
const router = express.Router();
const PagesaStatusController = require('../controllers/PagesaStatusController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const controller = new PagesaStatusController();

router.use(authenticateToken);
router.use(requireRole('admin'));

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.createPagesaStatus.bind(controller));
router.put('/:id', controller.updatePagesaStatus.bind(controller));
router.delete('/:id', controller.deletePagesaStatus.bind(controller));

module.exports = router;
