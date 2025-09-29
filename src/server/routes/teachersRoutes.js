const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/TeacherController');

// Teacher routes
router.get('/', TeacherController.getAllTeachers);
router.get('/:id', TeacherController.getTeacherById);
router.post('/', TeacherController.createTeacher);
router.put('/:id', TeacherController.updateTeacher);
router.delete('/:id', TeacherController.deleteTeacher);
router.get('/:id/subjects', TeacherController.getTeacherWithSubjects);

module.exports = router;
