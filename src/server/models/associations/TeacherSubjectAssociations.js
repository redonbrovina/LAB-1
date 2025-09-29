const Teacher = require('../Teacher');
const Subject = require('../Subject');

// Define associations
Teacher.hasMany(Subject, {
  foreignKey: 'TeacherId',
  as: 'subjects',
  onDelete: 'CASCADE'
});

Subject.belongsTo(Teacher, {
  foreignKey: 'TeacherId',
  as: 'teacher'
});

module.exports = { Teacher, Subject };
