const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Passenger = sequelize.define('Passenger', {
  PassengerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  TicketNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  FlightId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'flights',
      key: 'FlightId'
    }
  }
}, {
  tableName: 'passengers',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Passenger;
