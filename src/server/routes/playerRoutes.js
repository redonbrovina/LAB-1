const express = require('express');
const router = express.Router();
const playerController = require('../controllers/PlayerController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Apply authentication and admin role middleware to all routes
router.use(authenticateToken);
router.use(requireRole('admin'));

// GET /api/players - Get all players
router.get('/', playerController.getAllPlayers);

// GET /api/players/:id - Get player by ID
router.get('/:id', playerController.getPlayerById);

// POST /api/players - Create new player
router.post('/', playerController.createPlayer);

// PUT /api/players/:id - Update player
router.put('/:id', playerController.updatePlayer);

// DELETE /api/players/:id - Delete player
router.delete('/:id', playerController.deletePlayer);

// GET /api/players/team/:teamId - Get players by team
router.get('/team/:teamId', playerController.getPlayersByTeam);

module.exports = router;
