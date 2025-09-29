const express = require('express');
const router = express.Router();
const FlightController = require('../controllers/FlightController');

// Flight routes
router.get('/', FlightController.getAllFlights);
router.get('/:id', FlightController.getFlightById);
router.post('/', FlightController.createFlight);
router.put('/:id', FlightController.updateFlight);
router.delete('/:id', FlightController.deleteFlight);
router.get('/:id/passengers', FlightController.getFlightWithPassengers);

module.exports = router;
