const Flight = require('../models/Flight');
const Passenger = require('../models/Passenger');

class PassengerController {
  // Get all passengers
  static async getAllPassengers(req, res) {
    try {
      const passengers = await Passenger.findAll({
        include: [{
          model: Flight,
          as: 'flight'
        }],
        order: [['PassengerId', 'ASC']]
      });
      res.json(passengers);
    } catch (error) {
      console.error('Error fetching passengers:', error);
      res.status(500).json({ message: 'Error fetching passengers' });
    }
  }

  // Get passenger by ID
  static async getPassengerById(req, res) {
    try {
      const { id } = req.params;
      const passenger = await Passenger.findByPk(id, {
        include: [{
          model: Flight,
          as: 'flight'
        }]
      });
      
      if (!passenger) {
        return res.status(404).json({ message: 'Passenger not found' });
      }
      
      res.json(passenger);
    } catch (error) {
      console.error('Error fetching passenger:', error);
      res.status(500).json({ message: 'Error fetching passenger' });
    }
  }

  // Create new passenger
  static async createPassenger(req, res) {
    try {
      const { Name, TicketNumber, FlightId } = req.body;
      
      if (!Name || !TicketNumber || !FlightId) {
        return res.status(400).json({ message: 'Name, TicketNumber, and FlightId are required' });
      }

      // Check if flight exists
      const flight = await Flight.findByPk(FlightId);
      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }

      const passenger = await Passenger.create({
        Name,
        TicketNumber,
        FlightId
      });

      // Return passenger with flight info
      const passengerWithFlight = await Passenger.findByPk(passenger.PassengerId, {
        include: [{
          model: Flight,
          as: 'flight'
        }]
      });

      res.status(201).json(passengerWithFlight);
    } catch (error) {
      console.error('Error creating passenger:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Ticket number already exists' });
      } else {
        res.status(500).json({ message: 'Error creating passenger' });
      }
    }
  }

  // Update passenger
  static async updatePassenger(req, res) {
    try {
      const { id } = req.params;
      const { Name, TicketNumber, FlightId } = req.body;

      const passenger = await Passenger.findByPk(id);
      if (!passenger) {
        return res.status(404).json({ message: 'Passenger not found' });
      }

      // If FlightId is being updated, check if flight exists
      if (FlightId && FlightId !== passenger.FlightId) {
        const flight = await Flight.findByPk(FlightId);
        if (!flight) {
          return res.status(404).json({ message: 'Flight not found' });
        }
      }

      await passenger.update({
        Name: Name || passenger.Name,
        TicketNumber: TicketNumber || passenger.TicketNumber,
        FlightId: FlightId || passenger.FlightId
      });

      // Return updated passenger with flight info
      const updatedPassenger = await Passenger.findByPk(id, {
        include: [{
          model: Flight,
          as: 'flight'
        }]
      });

      res.json(updatedPassenger);
    } catch (error) {
      console.error('Error updating passenger:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Ticket number already exists' });
      } else {
        res.status(500).json({ message: 'Error updating passenger' });
      }
    }
  }

  // Delete passenger
  static async deletePassenger(req, res) {
    try {
      const { id } = req.params;
      
      const passenger = await Passenger.findByPk(id);
      if (!passenger) {
        return res.status(404).json({ message: 'Passenger not found' });
      }

      await passenger.destroy();
      res.json({ message: 'Passenger deleted successfully' });
    } catch (error) {
      console.error('Error deleting passenger:', error);
      res.status(500).json({ message: 'Error deleting passenger' });
    }
  }

  // Get all passengers with their flights
  static async getAllPassengersWithFlights(req, res) {
    try {
      const passengers = await Passenger.findAll({
        include: [{
          model: Flight,
          as: 'flight'
        }],
        order: [['PassengerId', 'ASC']]
      });
      res.json(passengers);
    } catch (error) {
      console.error('Error fetching passengers with flights:', error);
      res.status(500).json({ message: 'Error fetching passengers with flights' });
    }
  }
}

module.exports = PassengerController;
