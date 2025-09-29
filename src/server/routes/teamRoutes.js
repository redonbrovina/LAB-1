const express = require('express');
const router = express.Router();
const teamController = require('../controllers/TeamController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Apply authentication and admin role middleware to all routes
router.use(authenticateToken);
router.use(requireRole('admin'));

// GET /api/teams - Get all teams
router.get('/', teamController.getAllTeams);

// GET /api/teams/:id - Get team by ID
router.get('/:id', teamController.getTeamById);

// POST /api/teams - Create new team
router.post('/', teamController.createTeam);

// PUT /api/teams/:id - Update team
router.put('/:id', teamController.updateTeam);

// DELETE /api/teams/:id - Delete team
router.delete('/:id', teamController.deleteTeam);

module.exports = router;
