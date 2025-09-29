const express = require('express');
const router = express.Router();
const PassengerController = require('../controllers/PassengerController');

// Passenger routes
router.get('/', PassengerController.getAllPassengers);
router.get('/:id', PassengerController.getPassengerById);
router.post('/', PassengerController.createPassenger);
router.put('/:id', PassengerController.updatePassenger);
router.delete('/:id', PassengerController.deletePassenger);
router.get('/with-flights/all', PassengerController.getAllPassengersWithFlights);

module.exports = router;
