const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Student = sequelize.define('Student', {
  StudentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Surname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  YearOfStudy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  }
}, {
  tableName: 'students',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Student;
