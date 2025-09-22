import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-6 text-center">
      <h1 className="text-6xl sm:text-8xl lg:text-9xl text-red-500 font-bold mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-6 font-semibold">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md sm:max-w-lg lg:max-w-xl text-base sm:text-lg leading-relaxed">
        The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium text-base"
        >
          ← Go Back
        </button>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-base"
        >
          🏠 Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
