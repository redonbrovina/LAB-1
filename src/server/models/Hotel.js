const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Hotel = sequelize.define('Hotel', {
  HotelId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  Location: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  tableName: 'hotels',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Hotel;
