const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

class RoomController {
  static async createRoom(req, res) {
    try {
      const { RoomNumber, Capacity, HotelId } = req.body;

      if (!RoomNumber || !Capacity || !HotelId) {
        return res.status(400).json({ message: 'RoomNumber, Capacity, and HotelId are required' });
      }

      const hotel = await Hotel.findByPk(HotelId);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      const room = await Room.create({
        RoomNumber,
        Capacity,
        HotelId
      });

      const roomWithHotel = await Room.findByPk(room.RoomId, {
        include: [{ model: Hotel, as: 'hotel' }]
      });

      res.status(201).json(roomWithHotel);
    } catch (error) {
      console.error('Error creating room:', error);
      res.status(500).json({ message: 'Error creating room', error: error.message });
    }
  }

  static async getAllRooms(req, res) {
    try {
      const rooms = await Room.findAll({
        include: [{ model: Hotel, as: 'hotel' }]
      });
      res.status(200).json(rooms);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllRoomsWithHotels(req, res) {
    try {
      const rooms = await Room.findAll({
        include: [{ model: Hotel, as: 'hotel' }]
      });
      res.status(200).json(rooms);
    } catch (error) {
      console.error('Error fetching rooms with hotels:', error);
      res.status(500).json({ message: 'Error fetching rooms with hotels', error: error.message });
    }
  }

  static async getRoomById(req, res) {
    try {
      const room = await Room.findByPk(req.params.id, {
        include: [{ model: Hotel, as: 'hotel' }]
      });
      if (room) {
        res.status(200).json(room);
      } else {
        res.status(404).json({ error: 'Room not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateRoom(req, res) {
    try {
      const { id } = req.params;
      const { RoomNumber, Capacity, HotelId } = req.body;

      const room = await Room.findByPk(id);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      if (HotelId && HotelId !== room.HotelId) {
        const hotel = await Hotel.findByPk(HotelId);
        if (!hotel) {
          return res.status(404).json({ message: 'Hotel not found' });
        }
      }

      await room.update({
        RoomNumber: RoomNumber || room.RoomNumber,
        Capacity: Capacity || room.Capacity,
        HotelId: HotelId || room.HotelId
      });

      const updatedRoom = await Room.findByPk(id, {
        include: [{ model: Hotel, as: 'hotel' }]
      });

      res.json(updatedRoom);
    } catch (error) {
      console.error('Error updating room:', error);
      res.status(500).json({ message: 'Error updating room' });
    }
  }

  static async deleteRoom(req, res) {
    try {
      const deleted = await Room.destroy({
        where: { RoomId: req.params.id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Room not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = RoomController;
