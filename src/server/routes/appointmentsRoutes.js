const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');

// Appointment routes
router.get('/', AppointmentController.getAllAppointments);
router.get('/:id', AppointmentController.getAppointmentById);
router.post('/', AppointmentController.createAppointment);
router.put('/:id', AppointmentController.updateAppointment);
router.delete('/:id', AppointmentController.deleteAppointment);
router.get('/with-doctors/all', AppointmentController.getAllAppointmentsWithDoctors);

module.exports = router;
