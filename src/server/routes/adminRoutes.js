const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const controller = new AdminController();

router.post('/login', controller.adminLogin.bind(controller));

router.use(authenticateToken);
router.use(requireRole('admin'));

router.get('/dashboard-stats', controller.getDashboardStats.bind(controller));
router.get('/profile', controller.getCurrentAdmin.bind(controller));
router.get('/:adminID', controller.getAdminById.bind(controller));
router.put('/:adminID', controller.updateAdmin.bind(controller));
router.delete('/:adminID', controller.deleteAdmin.bind(controller));

module.exports = router;