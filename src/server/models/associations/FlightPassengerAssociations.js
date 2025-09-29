const Flight = require('../Flight');
const Passenger = require('../Passenger');

// Define associations
Flight.hasMany(Passenger, {
  foreignKey: 'FlightId',
  as: 'passengers',
  onDelete: 'CASCADE'
});

Passenger.belongsTo(Flight, {
  foreignKey: 'FlightId',
  as: 'flight'
});

module.exports = { Flight, Passenger };
