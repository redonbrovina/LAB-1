const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');
const Hotel = require('./Hotel');

const Room = sequelize.define('Room', {
  RoomId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  RoomNumber: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  HotelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Hotel,
      key: 'HotelId'
    }
  }
}, {
  tableName: 'rooms',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Room;
