const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Owner = sequelize.define('Owner', {
  OwnerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  tableName: 'owners',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Owner;
