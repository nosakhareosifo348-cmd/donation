const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('gh_token')
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

const api = {
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  get: (path) => request(path),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),

  // Auth
  login: (creds) => api.post('/auth/login', creds),
  getMe: () => api.get('/auth/me'),

  // Donations
  createDonation: (data) => api.post('/donations', data),
  getDonations: (params = '') => api.get(`/donations${params}`),
  getDonationStats: () => api.get('/donations/stats'),
  updateDonationStatus: (id, data) => api.patch(`/donations/${id}/status`, data),

  // Contact
  submitContact: (data) => api.post('/contact', data),
  getMessages: (params = '') => api.get(`/contact${params}`),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),

  // Newsletter
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
  getSubscribers: () => api.get('/newsletter/subscribers'),

  // Settings
  getSettings: () => api.get('/settings'),
  updateSettings: (data) => request('/settings', { method: 'PUT', body: JSON.stringify(data) }),
}

export default api
