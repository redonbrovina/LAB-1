const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/MovieController');

// Movie routes
router.get('/', MovieController.getAllMovies);
router.get('/:id', MovieController.getMovieById);
router.post('/', MovieController.createMovie);
router.put('/:id', MovieController.updateMovie);
router.delete('/:id', MovieController.deleteMovie);
router.get('/:id/actors', MovieController.getMovieWithActors);

module.exports = router;
