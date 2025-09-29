const Movie = require('../Movie');
const Actor = require('../Actor');

// Define associations
Movie.hasMany(Actor, {
  foreignKey: 'MovieId',
  as: 'actors',
  onDelete: 'CASCADE'
});

Actor.belongsTo(Movie, {
  foreignKey: 'MovieId',
  as: 'movie'
});

module.exports = { Movie, Actor };
