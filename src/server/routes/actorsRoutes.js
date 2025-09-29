const express = require('express');
const router = express.Router();
const ActorController = require('../controllers/ActorController');

// Actor routes
router.get('/', ActorController.getAllActors);
router.get('/:id', ActorController.getActorById);
router.post('/', ActorController.createActor);
router.put('/:id', ActorController.updateActor);
router.delete('/:id', ActorController.deleteActor);
router.get('/with-movies/all', ActorController.getAllActorsWithMovies);

module.exports = router;
