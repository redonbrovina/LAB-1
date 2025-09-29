const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/DoctorController');

// Doctor routes
router.get('/', DoctorController.getAllDoctors);
router.get('/:id', DoctorController.getDoctorById);
router.post('/', DoctorController.createDoctor);
router.put('/:id', DoctorController.updateDoctor);
router.delete('/:id', DoctorController.deleteDoctor);
router.get('/:id/appointments', DoctorController.getDoctorWithAppointments);

module.exports = router;
