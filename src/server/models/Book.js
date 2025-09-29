const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Book = sequelize.define('Book', {
  BookId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  Author: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  LibraryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'libraries',
      key: 'LibraryId'
    }
  }
}, {
  tableName: 'books',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Book;
