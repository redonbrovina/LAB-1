const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Flight = sequelize.define('Flight', {
  FlightId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  FlightNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  Destination: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'flights',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Flight;
