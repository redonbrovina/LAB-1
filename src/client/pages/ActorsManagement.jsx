import { useState, useEffect } from 'react';

const ActorsManagement = () => {
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingActor, setEditingActor] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    BirthYear: '',
    MovieId: ''
  });

  useEffect(() => {
    fetchActors();
    fetchMovies();
  }, []);

  const fetchActors = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/actors/with-movies/all');
      if (response.ok) {
        const data = await response.json();
        setActors(data);
      } else {
        setError('Failed to fetch actors');
      }
    } catch (error) {
      setError('Error fetching actors');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/movies');
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.Name.trim()) {
      setError('Actor name is required');
      return;
    }
    
    if (!formData.BirthYear) {
      setError('Birth year is required');
      return;
    }
    
    if (!formData.MovieId) {
      setError('Please select a movie');
      return;
    }
    
    // Validate birth year
    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(formData.BirthYear);
    if (birthYear < 1800 || birthYear > currentYear) {
      setError(`Birth year must be between 1800 and ${currentYear}`);
      return;
    }
    
    try {
      const url = editingActor 
        ? `http://localhost:5000/api/actors/${editingActor.ActorId}`
        : 'http://localhost:5000/api/actors';
      
      const method = editingActor ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          BirthYear: parseInt(formData.BirthYear),
          MovieId: parseInt(formData.MovieId)
        }),
      });

      if (response.ok) {
        await fetchActors();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save actor');
      }
    } catch (error) {
      console.error('Error saving actor:', error);
      setError('Error saving actor');
    }
  };

  const handleEdit = (actor) => {
    setEditingActor(actor);
    setFormData({
      Name: actor.Name,
      BirthYear: actor.BirthYear.toString(),
      MovieId: actor.MovieId.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this actor?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/actors/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchActors();
          setError('');
        } else {
          setError('Failed to delete actor');
        }
      } catch (error) {
        setError('Error deleting actor');
      }
    }
  };

  const resetForm = () => {
    setFormData({ Name: '', BirthYear: '', MovieId: '' });
    setEditingActor(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6">Loading actors...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Actors Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Actor
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
            {editingActor ? 'Edit Actor' : 'Add New Actor'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Actor Name</label>
              <input
                type="text"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Birth Year</label>
              <input
                type="number"
                value={formData.BirthYear}
                onChange={(e) => setFormData({ ...formData, BirthYear: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                min="1800"
                max={new Date().getFullYear()}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Movie</label>
              <select
                value={formData.MovieId}
                onChange={(e) => setFormData({ ...formData, MovieId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select a movie</option>
                {movies.map((movie) => (
                  <option key={movie.MovieId} value={movie.MovieId}>
                    {movie.Title} ({movie.Year}) - {movie.Genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingActor ? 'Update' : 'Create'}
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Actors List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all actors in the system
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {actors.map((actor) => (
            <li key={actor.ActorId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {actor.Name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {actor.Name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Born: {actor.BirthYear}
                    </div>
                    <div className="text-sm text-gray-500">
                      Movie: {actor.movie?.Title} ({actor.movie?.Year})
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(actor)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(actor.ActorId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {actors.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No actors found. Add your first actor!
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorsManagement;
