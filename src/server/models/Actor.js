const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Actor = sequelize.define('Actor', {
  ActorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  BirthYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  MovieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'movies',
      key: 'MovieId'
    }
  }
}, {
  tableName: 'actors',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Actor;
