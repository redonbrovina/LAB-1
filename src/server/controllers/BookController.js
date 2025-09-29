const Library = require('../models/Library');
const Book = require('../models/Book');

class BookController {
  // Get all books
  static async getAllBooks(req, res) {
    try {
      const books = await Book.findAll({
        include: [{
          model: Library,
          as: 'library'
        }],
        order: [['Title', 'ASC']]
      });
      res.json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Error fetching books' });
    }
  }

  // Get book by ID
  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id, {
        include: [{
          model: Library,
          as: 'library'
        }]
      });
      
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      
      res.json(book);
    } catch (error) {
      console.error('Error fetching book:', error);
      res.status(500).json({ message: 'Error fetching book' });
    }
  }

  // Create new book
  static async createBook(req, res) {
    try {
      const { Title, Author, LibraryId } = req.body;
      
      if (!Title || !Author || !LibraryId) {
        return res.status(400).json({ message: 'Title, Author, and LibraryId are required' });
      }

      // Check if library exists
      const library = await Library.findByPk(LibraryId);
      if (!library) {
        return res.status(404).json({ message: 'Library not found' });
      }

      const book = await Book.create({
        Title,
        Author,
        LibraryId
      });

      // Return book with library info
      const bookWithLibrary = await Book.findByPk(book.BookId, {
        include: [{
          model: Library,
          as: 'library'
        }]
      });

      res.status(201).json(bookWithLibrary);
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({ message: 'Error creating book' });
    }
  }

  // Update book
  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const { Title, Author, LibraryId } = req.body;

      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      // If LibraryId is being updated, check if library exists
      if (LibraryId && LibraryId !== book.LibraryId) {
        const library = await Library.findByPk(LibraryId);
        if (!library) {
          return res.status(404).json({ message: 'Library not found' });
        }
      }

      await book.update({
        Title: Title || book.Title,
        Author: Author || book.Author,
        LibraryId: LibraryId || book.LibraryId
      });

      // Return updated book with library info
      const updatedBook = await Book.findByPk(id, {
        include: [{
          model: Library,
          as: 'library'
        }]
      });

      res.json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ message: 'Error updating book' });
    }
  }

  // Delete book
  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      await book.destroy();
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ message: 'Error deleting book' });
    }
  }

  // Get all books with their libraries
  static async getAllBooksWithLibraries(req, res) {
    try {
      const books = await Book.findAll({
        include: [{
          model: Library,
          as: 'library'
        }],
        order: [['Title', 'ASC']]
      });
      res.json(books);
    } catch (error) {
      console.error('Error fetching books with libraries:', error);
      res.status(500).json({ message: 'Error fetching books with libraries' });
    }
  }
}

module.exports = BookController;
