const express = require('express');
const router = express.Router();
const { Planet } = require('../models');

// Get all planets (non-deleted)
router.get('/', async (req, res) => {
  try {
    const planets = await Planet.findAll({
      where: { IsDeleted: false },
      order: [['Name', 'ASC']]
    });
    res.json(planets);
  } catch (error) {
    console.error('Error fetching planets:', error);
    res.status(500).json({ message: 'Error fetching planets', error: error.message });
  }
});

// Get planet by ID
router.get('/:id', async (req, res) => {
  try {
    const planet = await Planet.findOne({
      where: { 
        PlanetId: req.params.id,
        IsDeleted: false 
      }
    });
    
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    
    res.json(planet);
  } catch (error) {
    console.error('Error fetching planet:', error);
    res.status(500).json({ message: 'Error fetching planet', error: error.message });
  }
});

// Create new planet
router.post('/', async (req, res) => {
  try {
    const { Name, Type } = req.body;
    
    if (!Name || !Type) {
      return res.status(400).json({ message: 'Name and Type are required' });
    }
    
    const planet = await Planet.create({
      Name,
      Type,
      IsDeleted: false
    });
    
    res.status(201).json(planet);
  } catch (error) {
    console.error('Error creating planet:', error);
    res.status(500).json({ message: 'Error creating planet', error: error.message });
  }
});

// Update planet
router.put('/:id', async (req, res) => {
  try {
    const { Name, Type } = req.body;
    
    const planet = await Planet.findOne({
      where: { 
        PlanetId: req.params.id,
        IsDeleted: false 
      }
    });
    
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    
    await planet.update({
      Name: Name || planet.Name,
      Type: Type || planet.Type
    });
    
    res.json(planet);
  } catch (error) {
    console.error('Error updating planet:', error);
    res.status(500).json({ message: 'Error updating planet', error: error.message });
  }
});

// Soft delete planet
router.delete('/:id', async (req, res) => {
  try {
    const planet = await Planet.findOne({
      where: { 
        PlanetId: req.params.id,
        IsDeleted: false 
      }
    });
    
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    
    await planet.update({ IsDeleted: true });
    
    res.json({ message: 'Planet deleted successfully' });
  } catch (error) {
    console.error('Error deleting planet:', error);
    res.status(500).json({ message: 'Error deleting planet', error: error.message });
  }
});

module.exports = router;
