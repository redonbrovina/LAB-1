import React, { useState, useEffect } from 'react';
import { lecturesAPI, lecturersAPI } from '../utils/api';

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);
  const [formData, setFormData] = useState({
    LectureName: '',
    LecturerID: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching lectures and lecturers...');
      const [lecturesData, lecturersData] = await Promise.all([
        lecturesAPI.getAll(),
        lecturersAPI.getAll()
      ]);
      console.log('Lectures data:', lecturesData);
      console.log('Lecturers data:', lecturersData);
      setLectures(lecturesData);
      setLecturers(lecturersData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lectureData = {
        ...formData,
        LecturerID: parseInt(formData.LecturerID)
      };

      console.log('Submitting lecture:', lectureData);
      if (editingLecture) {
        console.log('Updating lecture:', editingLecture.LectureID);
        await lecturesAPI.update(editingLecture.LectureID, lectureData);
      } else {
        console.log('Creating new lecture');
        await lecturesAPI.create(lectureData);
      }
      setShowModal(false);
      setEditingLecture(null);
      setFormData({ LectureName: '', LecturerID: '' });
      fetchData();
    } catch (error) {
      console.error('Error saving lecture:', error);
      alert('Error saving lecture: ' + error.message);
    }
  };

  const handleEdit = (lecture) => {
    setEditingLecture(lecture);
    setFormData({
      LectureName: lecture.LectureName,
      LecturerID: lecture.LecturerID.toString()
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      try {
        await lecturesAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting lecture:', error);
        alert('Error deleting lecture: ' + error.message);
      }
    }
  };

  const handleAddNew = () => {
    setEditingLecture(null);
    setFormData({ LectureName: '', LecturerID: '' });
    setShowModal(true);
  };

  const getLecturerName = (lecturerId) => {
    const lecturer = lecturers.find(l => l.LecturerID === lecturerId);
    return lecturer ? lecturer.LecturerName : 'Unknown Lecturer';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lectures Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add New Lecture
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lecture ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lecture Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lecturer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lectures.map((lecture) => (
              <tr key={lecture.LectureID}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {lecture.LectureID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lecture.LectureName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getLecturerName(lecture.LecturerID)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(lecture)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lecture.LectureID)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingLecture ? 'Edit Lecture' : 'Add New Lecture'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecture Name
                  </label>
                  <input
                    type="text"
                    value={formData.LectureName}
                    onChange={(e) => setFormData({ ...formData, LectureName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecturer
                  </label>
                  <select
                    value={formData.LecturerID}
                    onChange={(e) => setFormData({ ...formData, LecturerID: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a lecturer</option>
                    {lecturers.map((lecturer) => (
                      <option key={lecturer.LecturerID} value={lecturer.LecturerID}>
                        {lecturer.LecturerName} - {lecturer.Department}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                  >
                    {editingLecture ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lectures;
