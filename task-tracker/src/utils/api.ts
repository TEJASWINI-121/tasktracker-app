const API_URL = 'http://localhost:5001/api';
//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...options.headers,
  });

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ msg: 'An unknown error occurred' }));
    throw new Error(errorData.msg || 'Request failed');
  }

  // Handle cases where the response might be empty
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    // Gracefully handle empty body
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  }
  return {};
};

export const login = (username: string, password: string) => 
  apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const register = (username: string, password: string) => 
  apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const getEvents = () => apiFetch('/events');

export const createEvent = (event: { title: string, description?: string, status?: string, priority?: string, tags?: string[], comments?: any[], assignee?: string, date: string }) =>
  apiFetch('/events', {
    method: 'POST',
    body: JSON.stringify(event),
  });

export const updateEvent = (id: string, event: { title: string, description?: string, status?: string, priority?: string, tags?: string[], comments?: any[], assignee?: string, date: string }) =>
  apiFetch(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
  });

export const deleteEvent = (id: string) =>
  apiFetch(`/events/${id}`, {
    method: 'DELETE',
  });

// ... rest of the file unchanged ...