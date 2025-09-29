const Owner = require('../models/Owner');
const Car = require('../models/Car');

class OwnerController {
  static async createOwner(req, res) {
    try {
      const owner = await Owner.create(req.body);
      res.status(201).json(owner);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllOwners(req, res) {
    try {
      const owners = await Owner.findAll({
        include: [{ model: Car, as: 'cars', where: { IsDeleted: false }, required: false }]
      });
      res.status(200).json(owners);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getOwnerById(req, res) {
    try {
      const owner = await Owner.findByPk(req.params.id, {
        include: [{ model: Car, as: 'cars', where: { IsDeleted: false }, required: false }]
      });
      if (owner) {
        res.status(200).json(owner);
      } else {
        res.status(404).json({ error: 'Owner not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateOwner(req, res) {
    try {
      const [updated] = await Owner.update(req.body, {
        where: { OwnerId: req.params.id }
      });
      if (updated) {
        const updatedOwner = await Owner.findByPk(req.params.id);
        res.status(200).json(updatedOwner);
      } else {
        res.status(404).json({ error: 'Owner not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteOwner(req, res) {
    try {
      const deleted = await Owner.destroy({
        where: { OwnerId: req.params.id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Owner not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = OwnerController;
