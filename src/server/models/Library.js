const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Library = sequelize.define('Library', {
  LibraryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  City: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'libraries',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Library;
