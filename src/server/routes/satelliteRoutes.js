const express = require('express');
const router = express.Router();
const { Satellite, Planet } = require('../models');

// Get all satellites (non-deleted) with planet information
router.get('/', async (req, res) => {
  try {
    const satellites = await Satellite.findAll({
      where: { IsDeleted: false },
      include: [{
        model: Planet,
        as: 'Planet',
        where: { IsDeleted: false },
        attributes: ['PlanetId', 'Name', 'Type']
      }],
      order: [['Name', 'ASC']]
    });
    res.json(satellites);
  } catch (error) {
    console.error('Error fetching satellites:', error);
    res.status(500).json({ message: 'Error fetching satellites', error: error.message });
  }
});

// Get satellite by ID
router.get('/:id', async (req, res) => {
  try {
    const satellite = await Satellite.findOne({
      where: { 
        SatelliteId: req.params.id,
        IsDeleted: false 
      },
      include: [{
        model: Planet,
        as: 'Planet',
        where: { IsDeleted: false },
        attributes: ['PlanetId', 'Name', 'Type']
      }]
    });
    
    if (!satellite) {
      return res.status(404).json({ message: 'Satellite not found' });
    }
    
    res.json(satellite);
  } catch (error) {
    console.error('Error fetching satellite:', error);
    res.status(500).json({ message: 'Error fetching satellite', error: error.message });
  }
});

// Create new satellite
router.post('/', async (req, res) => {
  try {
    const { Name, PlanetId } = req.body;
    
    if (!Name || !PlanetId) {
      return res.status(400).json({ message: 'Name and PlanetId are required' });
    }
    
    // Check if planet exists and is not deleted
    const planet = await Planet.findOne({
      where: { 
        PlanetId: PlanetId,
        IsDeleted: false 
      }
    });
    
    if (!planet) {
      return res.status(400).json({ message: 'Planet not found or deleted' });
    }
    
    const satellite = await Satellite.create({
      Name,
      PlanetId,
      IsDeleted: false
    });
    
    // Fetch the created satellite with planet information
    const createdSatellite = await Satellite.findOne({
      where: { SatelliteId: satellite.SatelliteId },
      include: [{
        model: Planet,
        as: 'Planet',
        attributes: ['PlanetId', 'Name', 'Type']
      }]
    });
    
    res.status(201).json(createdSatellite);
  } catch (error) {
    console.error('Error creating satellite:', error);
    res.status(500).json({ message: 'Error creating satellite', error: error.message });
  }
});

// Update satellite
router.put('/:id', async (req, res) => {
  try {
    const { Name, PlanetId } = req.body;
    
    const satellite = await Satellite.findOne({
      where: { 
        SatelliteId: req.params.id,
        IsDeleted: false 
      }
    });
    
    if (!satellite) {
      return res.status(404).json({ message: 'Satellite not found' });
    }
    
    // If PlanetId is being updated, check if the new planet exists
    if (PlanetId && PlanetId !== satellite.PlanetId) {
      const planet = await Planet.findOne({
        where: { 
          PlanetId: PlanetId,
          IsDeleted: false 
        }
      });
      
      if (!planet) {
        return res.status(400).json({ message: 'Planet not found or deleted' });
      }
    }
    
    await satellite.update({
      Name: Name || satellite.Name,
      PlanetId: PlanetId || satellite.PlanetId
    });
    
    // Fetch updated satellite with planet information
    const updatedSatellite = await Satellite.findOne({
      where: { SatelliteId: satellite.SatelliteId },
      include: [{
        model: Planet,
        as: 'Planet',
        attributes: ['PlanetId', 'Name', 'Type']
      }]
    });
    
    res.json(updatedSatellite);
  } catch (error) {
    console.error('Error updating satellite:', error);
    res.status(500).json({ message: 'Error updating satellite', error: error.message });
  }
});

// Soft delete satellite
router.delete('/:id', async (req, res) => {
  try {
    const satellite = await Satellite.findOne({
      where: { 
        SatelliteId: req.params.id,
        IsDeleted: false 
      }
    });
    
    if (!satellite) {
      return res.status(404).json({ message: 'Satellite not found' });
    }
    
    await satellite.update({ IsDeleted: true });
    
    res.json({ message: 'Satellite deleted successfully' });
  } catch (error) {
    console.error('Error deleting satellite:', error);
    res.status(500).json({ message: 'Error deleting satellite', error: error.message });
  }
});

module.exports = router;
