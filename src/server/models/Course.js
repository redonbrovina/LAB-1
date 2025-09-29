const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Course = sequelize.define('Course', {
  CourseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  Credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 30
    }
  },
  StudentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'students',
      key: 'StudentId'
    }
  }
}, {
  tableName: 'courses',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Course;
