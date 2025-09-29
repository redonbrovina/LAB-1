const API_BASE_URL = 'http://localhost:5000/api';

export const createApiClient = (entityName) => {
    const baseUrl = `${API_BASE_URL}/${entityName.toLowerCase()}`;
    
    return {
        getAll: () => fetch(baseUrl).then(res => res.json()),
        getById: (id) => fetch(`${baseUrl}/${id}`).then(res => res.json()),
        create: (data) => fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json()),
        update: (id, data) => fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json()),
        delete: (id) => fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        }).then(res => res.json())
    };
};