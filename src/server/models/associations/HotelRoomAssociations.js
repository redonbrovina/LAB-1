const Hotel = require('../Hotel');
const Room = require('../Room');

Hotel.hasMany(Room, {
  foreignKey: 'HotelId',
  as: 'rooms',
  onDelete: 'CASCADE'
});

Room.belongsTo(Hotel, {
  foreignKey: 'HotelId',
  as: 'hotel'
});

module.exports = { Hotel, Room };
