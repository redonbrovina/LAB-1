const Movie = require('../models/Movie');
const Actor = require('../models/Actor');

class ActorController {
  // Get all actors
  static async getAllActors(req, res) {
    try {
      const actors = await Actor.findAll({
        include: [{
          model: Movie,
          as: 'movie'
        }],
        order: [['ActorId', 'ASC']]
      });
      res.json(actors);
    } catch (error) {
      console.error('Error fetching actors:', error);
      res.status(500).json({ message: 'Error fetching actors' });
    }
  }

  // Get actor by ID
  static async getActorById(req, res) {
    try {
      const { id } = req.params;
      const actor = await Actor.findByPk(id, {
        include: [{
          model: Movie,
          as: 'movie'
        }]
      });
      
      if (!actor) {
        return res.status(404).json({ message: 'Actor not found' });
      }
      
      res.json(actor);
    } catch (error) {
      console.error('Error fetching actor:', error);
      res.status(500).json({ message: 'Error fetching actor' });
    }
  }

  // Create new actor
  static async createActor(req, res) {
    try {
      const { Name, BirthYear, MovieId } = req.body;
      
      if (!Name || !BirthYear || !MovieId) {
        return res.status(400).json({ message: 'Name, BirthYear, and MovieId are required' });
      }

      // Check if movie exists
      const movie = await Movie.findByPk(MovieId);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      // Validate birth year
      const currentYear = new Date().getFullYear();
      if (BirthYear < 1800 || BirthYear > currentYear) {
        return res.status(400).json({ message: 'Birth year must be between 1800 and ' + currentYear });
      }

      const actor = await Actor.create({
        Name,
        BirthYear,
        MovieId
      });

      // Return actor with movie info
      const actorWithMovie = await Actor.findByPk(actor.ActorId, {
        include: [{
          model: Movie,
          as: 'movie'
        }]
      });

      res.status(201).json(actorWithMovie);
    } catch (error) {
      console.error('Error creating actor:', error);
      res.status(500).json({ message: 'Error creating actor' });
    }
  }

  // Update actor
  static async updateActor(req, res) {
    try {
      const { id } = req.params;
      const { Name, BirthYear, MovieId } = req.body;

      const actor = await Actor.findByPk(id);
      if (!actor) {
        return res.status(404).json({ message: 'Actor not found' });
      }

      // If MovieId is being updated, check if movie exists
      if (MovieId && MovieId !== actor.MovieId) {
        const movie = await Movie.findByPk(MovieId);
        if (!movie) {
          return res.status(404).json({ message: 'Movie not found' });
        }
      }

      // Validate birth year if provided
      if (BirthYear) {
        const currentYear = new Date().getFullYear();
        if (BirthYear < 1800 || BirthYear > currentYear) {
          return res.status(400).json({ message: 'Birth year must be between 1800 and ' + currentYear });
        }
      }

      await actor.update({
        Name: Name || actor.Name,
        BirthYear: BirthYear || actor.BirthYear,
        MovieId: MovieId || actor.MovieId
      });

      // Return updated actor with movie info
      const updatedActor = await Actor.findByPk(id, {
        include: [{
          model: Movie,
          as: 'movie'
        }]
      });

      res.json(updatedActor);
    } catch (error) {
      console.error('Error updating actor:', error);
      res.status(500).json({ message: 'Error updating actor' });
    }
  }

  // Delete actor
  static async deleteActor(req, res) {
    try {
      const { id } = req.params;
      
      const actor = await Actor.findByPk(id);
      if (!actor) {
        return res.status(404).json({ message: 'Actor not found' });
      }

      await actor.destroy();
      res.json({ message: 'Actor deleted successfully' });
    } catch (error) {
      console.error('Error deleting actor:', error);
      res.status(500).json({ message: 'Error deleting actor' });
    }
  }

  // Get all actors with their movies
  static async getAllActorsWithMovies(req, res) {
    try {
      const actors = await Actor.findAll({
        include: [{
          model: Movie,
          as: 'movie'
        }],
        order: [['ActorId', 'ASC']]
      });
      res.json(actors);
    } catch (error) {
      console.error('Error fetching actors with movies:', error);
      res.status(500).json({ message: 'Error fetching actors with movies' });
    }
  }
}

module.exports = ActorController;
