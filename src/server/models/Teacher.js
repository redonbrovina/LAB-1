const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Teacher = sequelize.define('Teacher', {
  TeacherId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  tableName: 'teachers',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Teacher;
