const Owner = require('../Owner');
const Car = require('../Car');

Owner.hasMany(Car, {
  foreignKey: 'OwnerId',
  as: 'cars',
  onDelete: 'CASCADE'
});

Car.belongsTo(Owner, {
  foreignKey: 'OwnerId',
  as: 'owner'
});

module.exports = { Owner, Car };
