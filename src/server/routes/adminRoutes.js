const express = require('express');
const router = express.Router();
const controller = require('../controllers/AdminController');

router.post('/login', controller.adminLogin);

router.get('/:adminID', controller.getAdminById);
router.get('/', controller.getAllAdminet);
router.put('/:adminID', controller.updateAdmin);
router.delete('/:adminID', controller.deleteAdmin);
module.exports = router;