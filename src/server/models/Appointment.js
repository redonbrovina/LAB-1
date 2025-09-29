const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Appointment = sequelize.define('Appointment', {
  AppointmentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  PatientName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  DoctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'doctors',
      key: 'DoctorId'
    }
  }
}, {
  tableName: 'appointments',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Appointment;
