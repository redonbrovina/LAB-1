const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/LectureController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Apply authentication and admin role middleware to all routes
router.use(authenticateToken);
router.use(requireRole('admin'));

// GET /api/lectures - Get all lectures
router.get('/', lectureController.getAllLectures);

// GET /api/lectures/:id - Get lecture by ID
router.get('/:id', lectureController.getLectureById);

// POST /api/lectures - Create new lecture
router.post('/', lectureController.createLecture);

// PUT /api/lectures/:id - Update lecture
router.put('/:id', lectureController.updateLecture);

// DELETE /api/lectures/:id - Delete lecture
router.delete('/:id', lectureController.deleteLecture);

// GET /api/lectures/lecturer/:lecturerId - Get lectures by lecturer
router.get('/lecturer/:lecturerId', lectureController.getLecturesByLecturer);

module.exports = router;
