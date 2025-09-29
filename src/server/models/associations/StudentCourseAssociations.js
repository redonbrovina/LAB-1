const Student = require('../Student');
const Course = require('../Course');

// Define associations
Student.hasMany(Course, {
  foreignKey: 'StudentId',
  as: 'courses',
  onDelete: 'CASCADE'
});

Course.belongsTo(Student, {
  foreignKey: 'StudentId',
  as: 'student'
});

module.exports = { Student, Course };
