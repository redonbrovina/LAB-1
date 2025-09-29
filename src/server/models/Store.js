const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Store = sequelize.define('Store', {
  StoreId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  StoreName: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  Location: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  tableName: 'stores',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Store;
