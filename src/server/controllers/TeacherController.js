const Teacher = require('../models/Teacher');
const Subject = require('../models/Subject');

class TeacherController {
  // Get all teachers
  static async getAllTeachers(req, res) {
    try {
      const teachers = await Teacher.findAll({
        order: [['TeacherId', 'ASC']]
      });
      res.json(teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      res.status(500).json({ message: 'Error fetching teachers' });
    }
  }

  // Get teacher by ID
  static async getTeacherById(req, res) {
    try {
      const { id } = req.params;
      const teacher = await Teacher.findByPk(id);
      
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      
      res.json(teacher);
    } catch (error) {
      console.error('Error fetching teacher:', error);
      res.status(500).json({ message: 'Error fetching teacher' });
    }
  }

  // Create new teacher
  static async createTeacher(req, res) {
    try {
      const { Name, Email } = req.body;
      
      if (!Name || !Email) {
        return res.status(400).json({ message: 'Name and Email are required' });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
      }

      const teacher = await Teacher.create({
        Name,
        Email
      });

      res.status(201).json(teacher);
    } catch (error) {
      console.error('Error creating teacher:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Email already exists' });
      } else {
        res.status(500).json({ message: 'Error creating teacher' });
      }
    }
  }

  // Update teacher
  static async updateTeacher(req, res) {
    try {
      const { id } = req.params;
      const { Name, Email } = req.body;

      const teacher = await Teacher.findByPk(id);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      // Validate email format if provided
      if (Email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
          return res.status(400).json({ message: 'Please provide a valid email address' });
        }
      }

      await teacher.update({
        Name: Name || teacher.Name,
        Email: Email || teacher.Email
      });

      res.json(teacher);
    } catch (error) {
      console.error('Error updating teacher:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Email already exists' });
      } else {
        res.status(500).json({ message: 'Error updating teacher' });
      }
    }
  }

  // Delete teacher
  static async deleteTeacher(req, res) {
    try {
      const { id } = req.params;
      
      const teacher = await Teacher.findByPk(id);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      await teacher.destroy();
      res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      console.error('Error deleting teacher:', error);
      res.status(500).json({ message: 'Error deleting teacher' });
    }
  }

  // Get teacher with their subjects
  static async getTeacherWithSubjects(req, res) {
    try {
      const { id } = req.params;
      
      const teacher = await Teacher.findByPk(id, {
        include: [{
          model: Subject,
          as: 'subjects'
        }]
      });

      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      res.json(teacher);
    } catch (error) {
      console.error('Error fetching teacher with subjects:', error);
      res.status(500).json({ message: 'Error fetching teacher with subjects' });
    }
  }
}

module.exports = TeacherController;
