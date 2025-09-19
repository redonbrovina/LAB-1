const express = require('express');
const router = express.Router();
const AplikimiStatusController = require('../controllers/AplikimiStatusController');
const { authenticateToken } = require('../middleware/auth');

const controller = new AplikimiStatusController();

router.use(authenticateToken);

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));

module.exports = router;
