const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Movie = sequelize.define('Movie', {
  MovieId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  Year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Genre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'movies',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Movie;
