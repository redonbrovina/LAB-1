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
  }
}


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

// Orders API functions
export const ordersAPI = {
  getAll: () => apiGet('/porosite'),
  getById: (id) => apiGet(`/porosite/${id}`),
  create: (data) => apiPost('/porosite', data),
  update: (id, data) => apiPut(`/porosite/${id}`, data),
  delete: (id) => apiDelete(`/porosite/${id}`),
};

// Cart API functions
export const cartAPI = {
  getAll: () => apiGet('/carts'),
  getById: (id) => apiGet(`/carts/${id}`),
  create: (data) => apiPost('/carts', data),
  update: (id, data) => apiPut(`/carts/${id}`, data),
  delete: (id) => apiDelete(`/carts/${id}`),
};

// Cart Items API functions
export const cartItemsAPI = {
  getAll: () => apiGet('/produkt-cart'),
  getById: (id) => apiGet(`/produkt-cart/${id}`),
  create: (data) => apiPost('/produkt-cart', data),
  update: (id, data) => apiPut(`/produkt-cart/${id}`, data),
  delete: (id) => apiDelete(`/produkt-cart/${id}`),
};

// Products API functions
export const productsAPI = {
  getAll: () => apiGet('/produkte'),
  getById: (id) => apiGet(`/produkte/${id}`),
  create: (data) => apiPost('/produkte', data),
  update: (id, data) => apiPut(`/produkte/${id}`, data),
  delete: (id) => apiDelete(`/produkte/${id}`),
};

// Categories API functions
export const categoriesAPI = {
  getAll: () => apiGet('/kategorite'),
  getById: (id) => apiGet(`/kategorite/${id}`),
  create: (data) => apiPost('/kategorite', data),
  update: (id, data) => apiPut(`/kategorite/${id}`, data),
  delete: (id) => apiDelete(`/kategorite/${id}`),
};