const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');

// Student routes
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getStudentById);
router.post('/', StudentController.createStudent);
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);
router.get('/:id/courses', StudentController.getStudentWithCourses);

module.exports = router;
