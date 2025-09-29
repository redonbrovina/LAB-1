const Library = require('../models/Library');
const Book = require('../models/Book');

class LibraryController {
  // Get all libraries
  static async getAllLibraries(req, res) {
    try {
      const libraries = await Library.findAll({
        order: [['Name', 'ASC']]
      });
      res.json(libraries);
    } catch (error) {
      console.error('Error fetching libraries:', error);
      res.status(500).json({ message: 'Error fetching libraries' });
    }
  }

  // Get library by ID
  static async getLibraryById(req, res) {
    try {
      const { id } = req.params;
      const library = await Library.findByPk(id);
      
      if (!library) {
        return res.status(404).json({ message: 'Library not found' });
      }
      
      res.json(library);
    } catch (error) {
      console.error('Error fetching library:', error);
      res.status(500).json({ message: 'Error fetching library' });
    }
  }

  // Create new library
  static async createLibrary(req, res) {
    try {
      const { Name, City } = req.body;
      
      if (!Name || !City) {
        return res.status(400).json({ message: 'Name and City are required' });
      }

      const library = await Library.create({
        Name,
        City
      });

      res.status(201).json(library);
    } catch (error) {
      console.error('Error creating library:', error);
      res.status(500).json({ message: 'Error creating library' });
    }
  }

  // Update library
  static async updateLibrary(req, res) {
    try {
      const { id } = req.params;
      const { Name, City } = req.body;

      const library = await Library.findByPk(id);
      if (!library) {
        return res.status(404).json({ message: 'Library not found' });
      }

      await library.update({
        Name: Name || library.Name,
        City: City || library.City
      });

      res.json(library);
    } catch (error) {
      console.error('Error updating library:', error);
      res.status(500).json({ message: 'Error updating library' });
    }
  }

  // Delete library
  static async deleteLibrary(req, res) {
    try {
      const { id } = req.params;
      
      const library = await Library.findByPk(id);
      if (!library) {
        return res.status(404).json({ message: 'Library not found' });
      }

      await library.destroy();
      res.json({ message: 'Library deleted successfully' });
    } catch (error) {
      console.error('Error deleting library:', error);
      res.status(500).json({ message: 'Error deleting library' });
    }
  }

  // Get library with their books
  static async getLibraryWithBooks(req, res) {
    try {
      const { id } = req.params;
      
      const library = await Library.findByPk(id, {
        include: [{
          model: Book,
          as: 'books'
        }]
      });

      if (!library) {
        return res.status(404).json({ message: 'Library not found' });
      }

      res.json(library);
    } catch (error) {
      console.error('Error fetching library with books:', error);
      res.status(500).json({ message: 'Error fetching library with books' });
    }
  }
}

module.exports = LibraryController;
