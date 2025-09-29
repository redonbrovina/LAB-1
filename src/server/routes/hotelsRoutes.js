const express = require('express');
const router = express.Router();
const HotelController = require('../controllers/HotelController');

router.post('/', HotelController.createHotel);
router.get('/', HotelController.getAllHotels);
router.get('/:id', HotelController.getHotelById);
router.put('/:id', HotelController.updateHotel);
router.delete('/:id', HotelController.deleteHotel);

module.exports = router;
