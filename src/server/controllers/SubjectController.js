const Teacher = require('../models/Teacher');
const Subject = require('../models/Subject');

class SubjectController {
  // Get all subjects
  static async getAllSubjects(req, res) {
    try {
      const subjects = await Subject.findAll({
        include: [{
          model: Teacher,
          as: 'teacher'
        }],
        order: [['SubjectId', 'ASC']]
      });
      res.json(subjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      res.status(500).json({ message: 'Error fetching subjects' });
    }
  }

  // Get subject by ID
  static async getSubjectById(req, res) {
    try {
      const { id } = req.params;
      const subject = await Subject.findByPk(id, {
        include: [{
          model: Teacher,
          as: 'teacher'
        }]
      });
      
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      
      res.json(subject);
    } catch (error) {
      console.error('Error fetching subject:', error);
      res.status(500).json({ message: 'Error fetching subject' });
    }
  }

  // Create new subject
  static async createSubject(req, res) {
    try {
      const { Title, Credits, TeacherId } = req.body;
      
      if (!Title || !Credits || !TeacherId) {
        return res.status(400).json({ message: 'Title, Credits, and TeacherId are required' });
      }

      // Check if teacher exists
      const teacher = await Teacher.findByPk(TeacherId);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      // Validate credits
      const credits = parseInt(Credits);
      if (credits < 1 || credits > 10) {
        return res.status(400).json({ message: 'Credits must be between 1 and 10' });
      }

      const subject = await Subject.create({
        Title,
        Credits: credits,
        TeacherId
      });

      // Return subject with teacher info
      const subjectWithTeacher = await Subject.findByPk(subject.SubjectId, {
        include: [{
          model: Teacher,
          as: 'teacher'
        }]
      });

      res.status(201).json(subjectWithTeacher);
    } catch (error) {
      console.error('Error creating subject:', error);
      res.status(500).json({ message: 'Error creating subject' });
    }
  }

  // Update subject
  static async updateSubject(req, res) {
    try {
      const { id } = req.params;
      const { Title, Credits, TeacherId } = req.body;

      const subject = await Subject.findByPk(id);
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }

      // If TeacherId is being updated, check if teacher exists
      if (TeacherId && TeacherId !== subject.TeacherId) {
        const teacher = await Teacher.findByPk(TeacherId);
        if (!teacher) {
          return res.status(404).json({ message: 'Teacher not found' });
        }
      }

      // Validate credits if provided
      let credits = subject.Credits;
      if (Credits) {
        credits = parseInt(Credits);
        if (credits < 1 || credits > 10) {
          return res.status(400).json({ message: 'Credits must be between 1 and 10' });
        }
      }

      await subject.update({
        Title: Title || subject.Title,
        Credits: credits,
        TeacherId: TeacherId || subject.TeacherId
      });

      // Return updated subject with teacher info
      const updatedSubject = await Subject.findByPk(id, {
        include: [{
          model: Teacher,
          as: 'teacher'
        }]
      });

      res.json(updatedSubject);
    } catch (error) {
      console.error('Error updating subject:', error);
      res.status(500).json({ message: 'Error updating subject' });
    }
  }

  // Delete subject
  static async deleteSubject(req, res) {
    try {
      const { id } = req.params;
      
      const subject = await Subject.findByPk(id);
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }

      await subject.destroy();
      res.json({ message: 'Subject deleted successfully' });
    } catch (error) {
      console.error('Error deleting subject:', error);
      res.status(500).json({ message: 'Error deleting subject' });
    }
  }

  // Get all subjects with their teachers
  static async getAllSubjectsWithTeachers(req, res) {
    try {
      const subjects = await Subject.findAll({
        include: [{
          model: Teacher,
          as: 'teacher'
        }],
        order: [['SubjectId', 'ASC']]
      });
      res.json(subjects);
    } catch (error) {
      console.error('Error fetching subjects with teachers:', error);
      res.status(500).json({ message: 'Error fetching subjects with teachers' });
    }
  }
}

module.exports = SubjectController;
