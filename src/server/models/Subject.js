const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Subject = sequelize.define('Subject', {
  SubjectId: {
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
      max: 10
    }
  },
  TeacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teachers',
      key: 'TeacherId'
    }
  }
}, {
  tableName: 'subjects',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Subject;
