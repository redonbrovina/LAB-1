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
  let token = localStorage.getItem('accessToken');
  
  console.log(`Making API request to: ${API_BASE_URL}${endpoint}`);
  console.log('Token available:', !!token);
  
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
    
    console.log(`Response status: ${response.status} for ${endpoint}`);
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));
    
    // Handle token expiration
    if (response.status === 401) {
      console.log('Token expired, attempting refresh...');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          console.log('Refresh token found, calling refresh endpoint...');
          const refreshResponse = await publicApiPost('/form/refresh-token', { refreshToken });
          const newAccessToken = refreshResponse.accessToken;
          
          console.log('Token refreshed successfully, new token:', newAccessToken.substring(0, 20) + '...');
          localStorage.setItem('accessToken', newAccessToken);
          
          // Retry the original request with new token
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.log('Retrying original request with new token...');
          const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, config);
          
          if (!retryResponse.ok) {
            const errorData = await retryResponse.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${retryResponse.status}`);
          }
          
          return await retryResponse.json();
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          throw new Error('Authentication required');
        }
      } else {
        console.log('No refresh token available, redirecting to login');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
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
      console.error(`API error for ${endpoint}:`, errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`API response for ${endpoint}:`, data);
    return data;
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
  getWithVariations: (id) => apiGet(`/produkte/${id}/variations`),
  search: (query) => apiGet(`/produkte/search?q=${encodeURIComponent(query)}`),
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