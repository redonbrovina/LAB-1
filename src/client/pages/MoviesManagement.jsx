import { useState, useEffect } from 'react';

const MoviesManagement = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    Year: '',
    Genre: ''
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/movies');
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        setError('Failed to fetch movies');
      }
    } catch (error) {
      setError('Error fetching movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.Title.trim()) {
      setError('Movie title is required');
      return;
    }
    
    if (!formData.Year) {
      setError('Release year is required');
      return;
    }
    
    if (!formData.Genre.trim()) {
      setError('Genre is required');
      return;
    }
    
    // Validate year
    const currentYear = new Date().getFullYear();
    const year = parseInt(formData.Year);
    if (year < 1888 || year > currentYear + 5) {
      setError(`Year must be between 1888 and ${currentYear + 5}`);
      return;
    }
    
    try {
      const url = editingMovie 
        ? `http://localhost:5000/api/movies/${editingMovie.MovieId}`
        : 'http://localhost:5000/api/movies';
      
      const method = editingMovie ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          Year: parseInt(formData.Year)
        }),
      });

      if (response.ok) {
        await fetchMovies();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save movie');
      }
    } catch (error) {
      console.error('Error saving movie:', error);
      setError('Error saving movie');
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      Title: movie.Title,
      Year: movie.Year.toString(),
      Genre: movie.Genre
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchMovies();
          setError('');
        } else {
          setError('Failed to delete movie');
        }
      } catch (error) {
        setError('Error deleting movie');
      }
    }
  };

  const resetForm = () => {
    setFormData({ Title: '', Year: '', Genre: '' });
    setEditingMovie(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6">Loading movies...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Movies Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Movie
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
            {editingMovie ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Movie Title</label>
              <input
                type="text"
                value={formData.Title}
                onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Release Year</label>
              <input
                type="number"
                value={formData.Year}
                onChange={(e) => setFormData({ ...formData, Year: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                min="1888"
                max={new Date().getFullYear() + 5}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Genre</label>
              <input
                type="text"
                value={formData.Genre}
                onChange={(e) => setFormData({ ...formData, Genre: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingMovie ? 'Update' : 'Create'}
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Movies List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all movies in the system
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {movies.map((movie) => (
            <li key={movie.MovieId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {movie.Title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {movie.Title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {movie.Year} • {movie.Genre}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.MovieId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {movies.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No movies found. Add your first movie!
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesManagement;
