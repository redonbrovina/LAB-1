const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');

// Course routes
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseById);
router.post('/', CourseController.createCourse);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.get('/with-students/all', CourseController.getAllCoursesWithStudents);

module.exports = router;
