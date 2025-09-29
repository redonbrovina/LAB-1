const Doctor = require('../Doctor');
const Appointment = require('../Appointment');

// Define associations
Doctor.hasMany(Appointment, {
  foreignKey: 'DoctorId',
  as: 'appointments',
  onDelete: 'CASCADE'
});

Appointment.belongsTo(Doctor, {
  foreignKey: 'DoctorId',
  as: 'doctor'
});

module.exports = { Doctor, Appointment };
