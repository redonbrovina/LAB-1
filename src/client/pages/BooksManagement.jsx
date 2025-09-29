import { useState, useEffect } from 'react';

const BooksManagement = () => {
  const [books, setBooks] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    Author: '',
    LibraryId: ''
  });

  useEffect(() => {
    fetchBooks();
    fetchLibraries();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/books/with-libraries/all');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        setError('Failed to fetch books');
      }
    } catch (error) {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const fetchLibraries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/libraries');
      if (response.ok) {
        const data = await response.json();
        setLibraries(data);
      } else {
        setError('Failed to fetch libraries for dropdown');
      }
    } catch (error) {
      setError('Error fetching libraries for dropdown');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.Title.trim()) {
      setError('Book title is required');
      return;
    }
    
    if (!formData.Author.trim()) {
      setError('Author is required');
      return;
    }
    
    if (!formData.LibraryId) {
      setError('Library is required');
      return;
    }
    
    try {
      const url = editingBook 
        ? `http://localhost:5000/api/books/${editingBook.BookId}`
        : 'http://localhost:5000/api/books';
      
      const method = editingBook ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchBooks();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save book');
      }
    } catch (error) {
      console.error('Error saving book:', error);
      setError('Error saving book');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      Title: book.Title,
      Author: book.Author,
      LibraryId: book.LibraryId.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchBooks();
          setError('');
        } else {
          setError('Failed to delete book');
        }
      } catch (error) {
        setError('Error deleting book');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      Title: '',
      Author: '',
      LibraryId: ''
    });
    setEditingBook(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6">Loading books...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Books Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Book
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
            {editingBook ? 'Edit Book' : 'Add New Book'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Book Title</label>
              <input
                type="text"
                value={formData.Title}
                onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g., The Great Gatsby"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input
                type="text"
                value={formData.Author}
                onChange={(e) => setFormData({ ...formData, Author: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g., F. Scott Fitzgerald"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Library</label>
              <select
                value={formData.LibraryId}
                onChange={(e) => setFormData({ ...formData, LibraryId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select a library</option>
                {libraries.map((library) => (
                  <option key={library.LibraryId} value={library.LibraryId}>
                    {library.Name} ({library.City})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingBook ? 'Update' : 'Create'}
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Books List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all books and their library assignments
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {books.map((book) => (
            <li key={book.BookId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        📖
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {book.Title}
                    </div>
                    <div className="text-sm text-gray-500">
                      ✍️ Author: {book.Author}
                    </div>
                    <div className="text-sm text-gray-500">
                      📚 Library: {book.library ? `${book.library.Name} (${book.library.City})` : 'N/A'}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.BookId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {books.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No books found. Add your first book!
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksManagement;
