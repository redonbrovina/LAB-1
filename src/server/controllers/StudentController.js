const Student = require('../models/Student');
const Course = require('../models/Course');

class StudentController {
  // Get all students
  static async getAllStudents(req, res) {
    try {
      const students = await Student.findAll({
        order: [['StudentId', 'ASC']]
      });
      res.json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ message: 'Error fetching students' });
    }
  }

  // Get student by ID
  static async getStudentById(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findByPk(id);
      
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      
      res.json(student);
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ message: 'Error fetching student' });
    }
  }

  // Create new student
  static async createStudent(req, res) {
    try {
      const { Name, Surname, YearOfStudy } = req.body;
      
      if (!Name || !Surname || !YearOfStudy) {
        return res.status(400).json({ message: 'Name, Surname, and YearOfStudy are required' });
      }

      const student = await Student.create({
        Name,
        Surname,
        YearOfStudy
      });

      res.status(201).json(student);
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(500).json({ message: 'Error creating student' });
    }
  }

  // Update student
  static async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const { Name, Surname, YearOfStudy } = req.body;

      const student = await Student.findByPk(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      await student.update({
        Name: Name || student.Name,
        Surname: Surname || student.Surname,
        YearOfStudy: YearOfStudy || student.YearOfStudy
      });

      res.json(student);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ message: 'Error updating student' });
    }
  }

  // Delete student
  static async deleteStudent(req, res) {
    try {
      const { id } = req.params;
      
      const student = await Student.findByPk(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      await student.destroy();
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Error deleting student' });
    }
  }

  // Get student with their courses
  static async getStudentWithCourses(req, res) {
    try {
      const { id } = req.params;
      
      const student = await Student.findByPk(id, {
        include: [{
          model: Course,
          as: 'courses'
        }]
      });

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.json(student);
    } catch (error) {
      console.error('Error fetching student with courses:', error);
      res.status(500).json({ message: 'Error fetching student with courses' });
    }
  }
}

module.exports = StudentController;
