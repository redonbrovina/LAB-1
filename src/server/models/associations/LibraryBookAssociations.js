const Library = require('../Library');
const Book = require('../Book');

// Define associations
Library.hasMany(Book, {
  foreignKey: 'LibraryId',
  as: 'books',
  onDelete: 'CASCADE'
});

Book.belongsTo(Library, {
  foreignKey: 'LibraryId',
  as: 'library'
});

module.exports = { Library, Book };
