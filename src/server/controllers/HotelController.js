const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

class HotelController {
  static async createHotel(req, res) {
    try {
      const hotel = await Hotel.create(req.body);
      res.status(201).json(hotel);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllHotels(req, res) {
    try {
      const hotels = await Hotel.findAll({
        include: [{ model: Room, as: 'rooms' }]
      });
      res.status(200).json(hotels);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getHotelById(req, res) {
    try {
      const hotel = await Hotel.findByPk(req.params.id, {
        include: [{ model: Room, as: 'rooms' }]
      });
      if (hotel) {
        res.status(200).json(hotel);
      } else {
        res.status(404).json({ error: 'Hotel not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateHotel(req, res) {
    try {
      const [updated] = await Hotel.update(req.body, {
        where: { HotelId: req.params.id }
      });
      if (updated) {
        const updatedHotel = await Hotel.findByPk(req.params.id);
        res.status(200).json(updatedHotel);
      } else {
        res.status(404).json({ error: 'Hotel not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteHotel(req, res) {
    try {
      const deleted = await Hotel.destroy({
        where: { HotelId: req.params.id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Hotel not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = HotelController;
