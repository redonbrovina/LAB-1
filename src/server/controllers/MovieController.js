const Movie = require('../models/Movie');
const Actor = require('../models/Actor');

class MovieController {
  // Get all movies
  static async getAllMovies(req, res) {
    try {
      const movies = await Movie.findAll({
        order: [['MovieId', 'ASC']]
      });
      res.json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ message: 'Error fetching movies' });
    }
  }

  // Get movie by ID
  static async getMovieById(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      
      res.json(movie);
    } catch (error) {
      console.error('Error fetching movie:', error);
      res.status(500).json({ message: 'Error fetching movie' });
    }
  }

  // Create new movie
  static async createMovie(req, res) {
    try {
      const { Title, Year, Genre } = req.body;
      
      if (!Title || !Year || !Genre) {
        return res.status(400).json({ message: 'Title, Year, and Genre are required' });
      }

      // Validate year
      const currentYear = new Date().getFullYear();
      if (Year < 1888 || Year > currentYear + 5) {
        return res.status(400).json({ message: 'Year must be between 1888 and ' + (currentYear + 5) });
      }

      const movie = await Movie.create({
        Title,
        Year,
        Genre
      });

      res.status(201).json(movie);
    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(500).json({ message: 'Error creating movie' });
    }
  }

  // Update movie
  static async updateMovie(req, res) {
    try {
      const { id } = req.params;
      const { Title, Year, Genre } = req.body;

      const movie = await Movie.findByPk(id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      // Validate year if provided
      if (Year) {
        const currentYear = new Date().getFullYear();
        if (Year < 1888 || Year > currentYear + 5) {
          return res.status(400).json({ message: 'Year must be between 1888 and ' + (currentYear + 5) });
        }
      }

      await movie.update({
        Title: Title || movie.Title,
        Year: Year || movie.Year,
        Genre: Genre || movie.Genre
      });

      res.json(movie);
    } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).json({ message: 'Error updating movie' });
    }
  }

  // Delete movie
  static async deleteMovie(req, res) {
    try {
      const { id } = req.params;
      
      const movie = await Movie.findByPk(id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      await movie.destroy();
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ message: 'Error deleting movie' });
    }
  }

  // Get movie with their actors
  static async getMovieWithActors(req, res) {
    try {
      const { id } = req.params;
      
      const movie = await Movie.findByPk(id, {
        include: [{
          model: Actor,
          as: 'actors'
        }]
      });

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      res.json(movie);
    } catch (error) {
      console.error('Error fetching movie with actors:', error);
      res.status(500).json({ message: 'Error fetching movie with actors' });
    }
  }
}

module.exports = MovieController;
