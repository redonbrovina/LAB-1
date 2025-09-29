const express = require('express');
const router = express.Router();
const lecturerController = require('../controllers/LecturerController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Apply authentication and admin role middleware to all routes
router.use(authenticateToken);
router.use(requireRole('admin'));

// GET /api/lecturers - Get all lecturers
router.get('/', lecturerController.getAllLecturers);

// GET /api/lecturers/:id - Get lecturer by ID
router.get('/:id', lecturerController.getLecturerById);

// POST /api/lecturers - Create new lecturer
router.post('/', lecturerController.createLecturer);

// PUT /api/lecturers/:id - Update lecturer
router.put('/:id', lecturerController.updateLecturer);

// DELETE /api/lecturers/:id - Delete lecturer
router.delete('/:id', lecturerController.deleteLecturer);

module.exports = router;
