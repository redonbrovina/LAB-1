import { useState, useEffect } from 'react';

const CoursesManagement = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    Credits: '',
    StudentId: ''
  });

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        setError('Failed to fetch courses');
      }
    } catch (error) {
      setError('Error fetching courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCourse 
        ? `http://localhost:5000/api/courses/${editingCourse.CourseId}`
        : 'http://localhost:5000/api/courses';
      
      const method = editingCourse ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          Credits: parseInt(formData.Credits),
          StudentId: parseInt(formData.StudentId)
        }),
      });

      if (response.ok) {
        await fetchCourses();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save course');
      }
    } catch (error) {
      setError('Error saving course');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      Title: course.Title,
      Credits: course.Credits.toString(),
      StudentId: course.StudentId.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchCourses();
          setError('');
        } else {
          setError('Failed to delete course');
        }
      } catch (error) {
        setError('Error deleting course');
      }
    }
  };

  const resetForm = () => {
    setFormData({ Title: '', Credits: '', StudentId: '' });
    setEditingCourse(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6">Loading courses...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Courses Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Course
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingCourse ? 'Edit Course' : 'Add New Course'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Title</label>
              <input
                type="text"
                value={formData.Title}
                onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Credits</label>
              <input
                type="number"
                min="1"
                max="30"
                value={formData.Credits}
                onChange={(e) => setFormData({ ...formData, Credits: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Student</label>
              <select
                value={formData.StudentId}
                onChange={(e) => setFormData({ ...formData, StudentId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student.StudentId} value={student.StudentId}>
                    {student.Name} {student.Surname} (Year {student.YearOfStudy})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingCourse ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Courses List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all courses and their assigned students
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {courses.map((course) => (
            <li key={course.CourseId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {course.Title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {course.Title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {course.Credits} credits • Student: {course.student ? `${course.student.Name} ${course.student.Surname}` : 'No student assigned'}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.CourseId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {courses.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No courses found. Add your first course!
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesManagement;
