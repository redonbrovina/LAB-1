const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

const controller = new AdminController();

router.post('/login', controller.adminLogin.bind(controller));

router.get('/dashboard-stats', controller.getDashboardStats.bind(controller));
router.get('/', controller.getAllAdminet.bind(controller));
router.get('/:adminID', controller.getAdminById.bind(controller));
router.put('/:adminID', controller.updateAdmin.bind(controller));
router.delete('/:adminID', controller.deleteAdmin.bind(controller));

module.exports = router;