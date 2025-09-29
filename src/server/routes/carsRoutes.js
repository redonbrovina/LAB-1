const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController');

router.post('/', CarController.createCar);
router.get('/', CarController.getAllCars);
router.get('/with-owners/all', CarController.getAllCarsWithOwners);
router.get('/:id', CarController.getCarById);
router.put('/:id', CarController.updateCar);
router.delete('/:id/soft', CarController.softDeleteCar);
router.delete('/:id', CarController.deleteCar);

module.exports = router;
