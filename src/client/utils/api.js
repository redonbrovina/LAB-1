const API_BASE_URL = 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Handle different response types
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('API call failed:', error);
// API utility functions for making requests
const API_BASE_URL = 'http://localhost:5000/api';


export const publicApiRequest = async (endpoint, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Public API request failed:', error);
    throw error;
  }
};

// Payment API functions
export const paymentAPI = {
  getAll: () => apiCall('/pagesa'),
  getById: (id) => apiCall(`/pagesa/${id}`),
  create: (data) => apiCall('/pagesa', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/pagesa/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/pagesa/${id}`, {
    method: 'DELETE',
  }),
};

// Stock Movement API functions
export const stockMovementAPI = {
  getAll: () => apiCall('/levizje-stok'),
  getById: (id) => apiCall(`/levizje-stok/${id}`),
  create: (data) => apiCall('/levizje-stok', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/levizje-stok/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/levizje-stok/${id}`, {
    method: 'DELETE',
  }),
};

// Payment Methods API functions
export const paymentMethodsAPI = {
  getAll: () => apiCall('/menyra-pageses'),
  getById: (id) => apiCall(`/menyra-pageses/${id}`),
  create: (data) => apiCall('/menyra-pageses', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/menyra-pageses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/menyra-pageses/${id}`, {
    method: 'DELETE',
  }),
};

// Form API functions (login, signup, countries)
export const formAPI = {
  login: (data) => apiCall('/form/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  signup: (data) => apiCall('/form/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getCountries: () => apiCall('/form/shtetet'),
};

// Cart API functions
export const cartAPI = {
  getAll: () => apiCall('/carts'),
  getById: (id) => apiCall(`/carts/${id}`),
  create: (data) => apiCall('/carts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/carts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/carts/${id}`, {
    method: 'DELETE',
  }),
};


export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Authentication required');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};


export const publicApiPost = (endpoint, data) => publicApiRequest(endpoint, { 
  method: 'POST', 
  body: JSON.stringify(data) 
});
export const publicApiGet = (endpoint) => publicApiRequest(endpoint, { method: 'GET' });


export const apiGet = (endpoint) => apiRequest(endpoint, { method: 'GET' });
export const apiPost = (endpoint, data) => apiRequest(endpoint, { 
  method: 'POST', 
  body: JSON.stringify(data) 
});
export const apiPut = (endpoint, data) => apiRequest(endpoint, { 
  method: 'PUT', 
  body: JSON.stringify(data) 
});
export const apiDelete = (endpoint) => apiRequest(endpoint, { method: 'DELETE' });
