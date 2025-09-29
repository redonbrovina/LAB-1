const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Doctor = sequelize.define('Doctor', {
  DoctorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Specialization: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'doctors',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Doctor;
