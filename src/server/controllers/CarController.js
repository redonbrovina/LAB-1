const Car = require('../models/Car');
const Owner = require('../models/Owner');

class CarController {
  static async createCar(req, res) {
    try {
      const { PlateNumber, Model, OwnerId } = req.body;

      if (!PlateNumber || !Model || !OwnerId) {
        return res.status(400).json({ message: 'PlateNumber, Model, and OwnerId are required' });
      }

      const owner = await Owner.findByPk(OwnerId);
      if (!owner) {
        return res.status(404).json({ message: 'Owner not found' });
      }

      const car = await Car.create({
        PlateNumber,
        Model,
        OwnerId,
        IsDeleted: false
      });

      const carWithOwner = await Car.findByPk(car.CarId, {
        include: [{ model: Owner, as: 'owner' }]
      });

      res.status(201).json(carWithOwner);
    } catch (error) {
      console.error('Error creating car:', error);
      res.status(500).json({ message: 'Error creating car', error: error.message });
    }
  }

  static async getAllCars(req, res) {
    try {
      const cars = await Car.findAll({
        where: { IsDeleted: false },
        include: [{ model: Owner, as: 'owner' }]
      });
      res.status(200).json(cars);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllCarsWithOwners(req, res) {
    try {
      const cars = await Car.findAll({
        where: { IsDeleted: false },
        include: [{ model: Owner, as: 'owner' }]
      });
      res.status(200).json(cars);
    } catch (error) {
      console.error('Error fetching cars with owners:', error);
      res.status(500).json({ message: 'Error fetching cars with owners', error: error.message });
    }
  }

  static async getCarById(req, res) {
    try {
      const car = await Car.findByPk(req.params.id, {
        where: { IsDeleted: false },
        include: [{ model: Owner, as: 'owner' }]
      });
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json({ error: 'Car not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateCar(req, res) {
    try {
      const { id } = req.params;
      const { PlateNumber, Model, OwnerId } = req.body;

      const car = await Car.findByPk(id);
      if (!car || car.IsDeleted) {
        return res.status(404).json({ message: 'Car not found' });
      }

      if (OwnerId && OwnerId !== car.OwnerId) {
        const owner = await Owner.findByPk(OwnerId);
        if (!owner) {
          return res.status(404).json({ message: 'Owner not found' });
        }
      }

      await car.update({
        PlateNumber: PlateNumber || car.PlateNumber,
        Model: Model || car.Model,
        OwnerId: OwnerId || car.OwnerId
      });

      const updatedCar = await Car.findByPk(id, {
        include: [{ model: Owner, as: 'owner' }]
      });

      res.json(updatedCar);
    } catch (error) {
      console.error('Error updating car:', error);
      res.status(500).json({ message: 'Error updating car' });
    }
  }

  static async softDeleteCar(req, res) {
    try {
      const car = await Car.findByPk(req.params.id);
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }

      await car.update({ IsDeleted: true });
      res.status(200).json({ message: 'Car soft deleted successfully' });
    } catch (error) {
      console.error('Error soft deleting car:', error);
      res.status(500).json({ message: 'Error soft deleting car' });
    }
  }

  static async deleteCar(req, res) {
    try {
      const deleted = await Car.destroy({
        where: { CarId: req.params.id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Car not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CarController;
