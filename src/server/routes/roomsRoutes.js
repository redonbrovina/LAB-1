const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');

router.post('/', RoomController.createRoom);
router.get('/', RoomController.getAllRooms);
router.get('/with-hotels/all', RoomController.getAllRoomsWithHotels);
router.get('/:id', RoomController.getRoomById);
router.put('/:id', RoomController.updateRoom);
router.delete('/:id', RoomController.deleteRoom);

module.exports = router;
