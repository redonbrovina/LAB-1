const API_BASE_URL = 'http://localhost:5000/api';

// Track refresh attempts to prevent infinite loops
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 1;

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
    credentials: 'include', // Include cookies in requests
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
  getAll: () => apiRequest('/pagesa'),
  getPaginated: (page = 1, limit = 5) => apiRequest(`/pagesa/paginated?page=${page}&limit=${limit}`),
  getById: (id) => apiRequest(`/pagesa/${id}`),
  create: (data) => apiRequest('/pagesa', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/pagesa/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/pagesa/${id}`, {
    method: 'DELETE',
  }),
};

// Stock Movement API functions - Using existing product API for stock updates
export const stockMovementAPI = {
  // Note: Using existing productsAPI.increaseStock() and productsAPI.reduceStock() methods
  // No separate stock movement tracking - using direct product stock updates
};

// Payment Methods API functions
export const paymentMethodsAPI = {
  getAll: () => apiRequest('/menyra-pageses'),
  getById: (id) => apiRequest(`/menyra-pageses/${id}`),
  create: (data) => apiRequest('/menyra-pageses', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/menyra-pageses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/menyra-pageses/${id}`, {
    method: 'DELETE',
  }),
  deleteAll: () => apiRequest('/menyra-pageses', {
    method: 'DELETE',
  }),
};


export const apiRequest = async (endpoint, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Include cookies in requests
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    
    // Handle token expiration
    if (response.status === 401) {
      
      // Prevent infinite refresh loops
      if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        window.location.href = '/login';
        throw new Error('Authentication required');
      }
      
      refreshAttempts++;
      
      try {
        const refreshResponse = await publicApiPost('/form/refresh-token', {});
        
        // Retry the original request with fresh config (no Authorization header)
        const retryConfig = {
          ...config,
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          }
        };
        // Remove Authorization header to use cookie instead
        delete retryConfig.headers.Authorization;
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, retryConfig);
        
        if (!retryResponse.ok) {
          const errorData = await retryResponse.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP error! status: ${retryResponse.status}`);
        }
        
        refreshAttempts = 0; // Reset on success
        return await retryResponse.json();
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        refreshAttempts = 0; // Reset on failure
        window.location.href = '/login';
        throw new Error('Authentication required');
      }
    }
    
    // Handle 204 No Content responses first (before checking response.ok)
    if (response.status === 204) {
      console.log(`API response for ${endpoint}: 204 No Content`);
      return null;
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
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
  getByClientId: (clientId) => apiGet(`/porosite/klienti/${clientId}`),
  create: (data) => apiPost('/porosite', data),
  update: (id, data) => apiPut(`/porosite/${id}`, data),
  delete: (id) => apiDelete(`/porosite/${id}`),
};

// Order Items API functions
export const orderItemsAPI = {
  getAll: () => apiGet('/produkt-porosise'),
  getById: (id) => apiGet(`/produkt-porosise/${id}`),
  create: (data) => apiPost('/produkt-porosise', data),
  update: (id, data) => apiPut(`/produkt-porosise/${id}`, data),
  delete: (id) => apiDelete(`/produkt-porosise/${id}`),
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
  getPaginated: (page = 1, limit = 12) => apiGet(`/produkte/paginated?page=${page}&limit=${limit}`),
  getById: (id) => apiGet(`/produkte/${id}`),
  getByCategory: (categoryId) => apiGet(`/produkte/kategoria/${categoryId}`),
  search: (query) => apiGet(`/produkte/search?q=${encodeURIComponent(query)}`),
  create: (data) => apiPost('/produkte', data),
  update: (id, data) => apiPut(`/produkte/${id}`, data),
  delete: (id) => apiDelete(`/produkte/${id}`),
  increaseStock: (id, quantity) => apiPut(`/produkte/${id}/increase-stock`, { quantity }),
  reduceStock: (id, quantity) => apiPut(`/produkte/${id}/reduce-stock`, { quantity }),
};

// Categories API functions
export const categoriesAPI = {
  getAll: () => apiGet('/kategorite'),
  getById: (id) => apiGet(`/kategorite/${id}`),
  create: (data) => apiPost('/kategorite', data),
  update: (id, data) => apiPut(`/kategorite/${id}`, data),
  delete: (id) => apiDelete(`/kategorite/${id}`),
};

// Suppliers API functions
export const furnitoriAPI = {
  getAll: () => apiGet('/furnitore'),
  getById: (id) => apiGet(`/furnitore/${id}`),
  create: (data) => apiPost('/furnitore', data),
  update: (id, data) => apiPut(`/furnitore/${id}`, data),
  delete: (id) => apiDelete(`/furnitore/${id}`),
};

// Client API functions
export const clientAPI = {
  getAll: () => apiGet('/klienti'),
  getById: (id) => apiGet(`/klienti/${id}`),
  getByCompanyName: (companyName) => apiGet(`/klienti/search/${companyName}`),
  create: (data) => apiPost('/klienti', data),
  update: (id, data) => apiPut(`/klienti/${id}`, data),
  changePassword: (id, data) => apiPut(`/klienti/${id}/change-password`, data),
  delete: (id) => apiDelete(`/klienti/${id}`),
  // Login function for clients (no auth required)
  login: (data) => publicApiPost('/klienti/login', data),
};

// Team API functions
export const teamsAPI = {
  getAll: () => apiGet('/teams'),
  getById: (id) => apiGet(`/teams/${id}`),
  create: (data) => apiPost('/teams', data),
  update: (id, data) => apiPut(`/teams/${id}`, data),
  delete: (id) => apiDelete(`/teams/${id}`),
};

// Player API functions
export const playersAPI = {
  getAll: () => apiGet('/players'),
  getById: (id) => apiGet(`/players/${id}`),
  getByTeam: (teamId) => apiGet(`/players/team/${teamId}`),
  create: (data) => apiPost('/players', data),
  update: (id, data) => apiPut(`/players/${id}`, data),
  delete: (id) => apiDelete(`/players/${id}`),
};

// Employee API functions
export const employeesAPI = {
  getAll: () => apiGet('/employees'),
  getById: (id) => apiGet(`/employees/${id}`),
  create: (data) => apiPost('/employees', data),
  update: (id, data) => apiPut(`/employees/${id}`, data),
  delete: (id) => apiDelete(`/employees/${id}`),
};

// Contract API functions
export const contractsAPI = {
  getAll: () => apiGet('/contracts'),
  getById: (id) => apiGet(`/contracts/${id}`),
  getByEmployee: (employeeId) => apiGet(`/contracts/employee/${employeeId}`),
  create: (data) => apiPost('/contracts', data),
  update: (id, data) => apiPut(`/contracts/${id}`, data),
  delete: (id) => apiDelete(`/contracts/${id}`),
};