const express = require('express');
const router = express.Router();
const SubjectController = require('../controllers/SubjectController');

// Subject routes
router.get('/', SubjectController.getAllSubjects);
router.get('/:id', SubjectController.getSubjectById);
router.post('/', SubjectController.createSubject);
router.put('/:id', SubjectController.updateSubject);
router.delete('/:id', SubjectController.deleteSubject);
router.get('/with-teachers/all', SubjectController.getAllSubjectsWithTeachers);

module.exports = router;
