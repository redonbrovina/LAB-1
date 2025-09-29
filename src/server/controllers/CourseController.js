const Student = require('../models/Student');
const Course = require('../models/Course');

class CourseController {
  // Get all courses
  static async getAllCourses(req, res) {
    try {
      const courses = await Course.findAll({
        include: [{
          model: Student,
          as: 'student'
        }],
        order: [['CourseId', 'ASC']]
      });
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'Error fetching courses' });
    }
  }

  // Get course by ID
  static async getCourseById(req, res) {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id, {
        include: [{
          model: Student,
          as: 'student'
        }]
      });
      
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      res.json(course);
    } catch (error) {
      console.error('Error fetching course:', error);
      res.status(500).json({ message: 'Error fetching course' });
    }
  }

  // Create new course
  static async createCourse(req, res) {
    try {
      const { Title, Credits, StudentId } = req.body;
      
      if (!Title || !Credits || !StudentId) {
        return res.status(400).json({ message: 'Title, Credits, and StudentId are required' });
      }

      // Check if student exists
      const student = await Student.findByPk(StudentId);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      const course = await Course.create({
        Title,
        Credits,
        StudentId
      });

      // Return course with student info
      const courseWithStudent = await Course.findByPk(course.CourseId, {
        include: [{
          model: Student,
          as: 'student'
        }]
      });

      res.status(201).json(courseWithStudent);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ message: 'Error creating course' });
    }
  }

  // Update course
  static async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const { Title, Credits, StudentId } = req.body;

      const course = await Course.findByPk(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // If StudentId is being updated, check if student exists
      if (StudentId && StudentId !== course.StudentId) {
        const student = await Student.findByPk(StudentId);
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
      }

      await course.update({
        Title: Title || course.Title,
        Credits: Credits || course.Credits,
        StudentId: StudentId || course.StudentId
      });

      // Return updated course with student info
      const updatedCourse = await Course.findByPk(id, {
        include: [{
          model: Student,
          as: 'student'
        }]
      });

      res.json(updatedCourse);
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ message: 'Error updating course' });
    }
  }

  // Delete course
  static async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      
      const course = await Course.findByPk(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      await course.destroy();
      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ message: 'Error deleting course' });
    }
  }

  // Get all courses with their students
  static async getAllCoursesWithStudents(req, res) {
    try {
      const courses = await Course.findAll({
        include: [{
          model: Student,
          as: 'student'
        }],
        order: [['CourseId', 'ASC']]
      });
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses with students:', error);
      res.status(500).json({ message: 'Error fetching courses with students' });
    }
  }
}

module.exports = CourseController;
