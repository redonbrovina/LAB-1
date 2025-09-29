const Flight = require('../models/Flight');
const Passenger = require('../models/Passenger');

class FlightController {
  // Get all flights
  static async getAllFlights(req, res) {
    try {
      const flights = await Flight.findAll({
        order: [['Date', 'ASC']]
      });
      res.json(flights);
    } catch (error) {
      console.error('Error fetching flights:', error);
      res.status(500).json({ message: 'Error fetching flights' });
    }
  }

  // Get flight by ID
  static async getFlightById(req, res) {
    try {
      const { id } = req.params;
      const flight = await Flight.findByPk(id);
      
      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }
      
      res.json(flight);
    } catch (error) {
      console.error('Error fetching flight:', error);
      res.status(500).json({ message: 'Error fetching flight' });
    }
  }

  // Create new flight
  static async createFlight(req, res) {
    try {
      const { FlightNumber, Destination, Date: flightDateString } = req.body;
      
      if (!FlightNumber || !Destination || !flightDateString) {
        return res.status(400).json({ message: 'FlightNumber, Destination, and Date are required' });
      }

      // Parse and validate the date
      const flightDate = new Date(flightDateString);
      if (isNaN(flightDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format. Please enter a valid date.' });
      }

      // Check if flight date is not in the past (allow same day)
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const flightDay = new Date(flightDate.getFullYear(), flightDate.getMonth(), flightDate.getDate());
      
      if (flightDay < today) {
        return res.status(400).json({ message: 'Flight date cannot be in the past' });
      }

      const flight = await Flight.create({
        FlightNumber,
        Destination,
        Date: flightDate
      });

      res.status(201).json(flight);
    } catch (error) {
      console.error('Error creating flight:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Flight number already exists' });
      } else {
        res.status(500).json({ message: 'Error creating flight' });
      }
    }
  }

  // Update flight
  static async updateFlight(req, res) {
    try {
      const { id } = req.params;
      const { FlightNumber, Destination, Date: flightDateString } = req.body;

      const flight = await Flight.findByPk(id);
      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }

      // Parse and validate the date if provided
      let flightDate = flight.Date;
      if (flightDateString) {
        flightDate = new Date(flightDateString);
        if (isNaN(flightDate.getTime())) {
          return res.status(400).json({ message: 'Invalid date format. Please enter a valid date.' });
        }
        
        // Check if flight date is not in the past (allow same day)
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const flightDay = new Date(flightDate.getFullYear(), flightDate.getMonth(), flightDate.getDate());
        
        if (flightDay < today) {
          return res.status(400).json({ message: 'Flight date cannot be in the past' });
        }
      }

      await flight.update({
        FlightNumber: FlightNumber || flight.FlightNumber,
        Destination: Destination || flight.Destination,
        Date: flightDate
      });

      res.json(flight);
    } catch (error) {
      console.error('Error updating flight:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Flight number already exists' });
      } else {
        res.status(500).json({ message: 'Error updating flight' });
      }
    }
  }

  // Delete flight
  static async deleteFlight(req, res) {
    try {
      const { id } = req.params;
      
      const flight = await Flight.findByPk(id);
      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }

      await flight.destroy();
      res.json({ message: 'Flight deleted successfully' });
    } catch (error) {
      console.error('Error deleting flight:', error);
      res.status(500).json({ message: 'Error deleting flight' });
    }
  }

  // Get flight with their passengers
  static async getFlightWithPassengers(req, res) {
    try {
      const { id } = req.params;
      
      const flight = await Flight.findByPk(id, {
        include: [{
          model: Passenger,
          as: 'passengers'
        }]
      });

      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }

      res.json(flight);
    } catch (error) {
      console.error('Error fetching flight with passengers:', error);
      res.status(500).json({ message: 'Error fetching flight with passengers' });
    }
  }
}

module.exports = FlightController;
