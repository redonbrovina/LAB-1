const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');
const Owner = require('./Owner');

const Car = sequelize.define('Car', {
  CarId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  PlateNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  Model: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  OwnerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Owner,
      key: 'OwnerId'
    }
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'cars',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Car;
