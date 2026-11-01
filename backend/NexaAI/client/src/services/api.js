const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const TOKEN_KEY = "nexaai_access_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    let message = "Request failed";
    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      message = data.detail.map((item) => item.msg || item.message || JSON.stringify(item)).join(", ");
    } else if (data.message) {
      message = data.message;
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return data;
}

export const api = {
  register: (payload) => request("/api/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/api/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  resetPassword: (payload) => request("/api/auth/reset-password", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/api/auth/me"),
  logout: () => request("/api/auth/logout", { method: "POST" }),
  chat: (payload) => request("/api/chat", { method: "POST", body: JSON.stringify(payload) }),
  createConversation: (title = "New chat") => request("/api/conversations", { method: "POST", body: JSON.stringify({ title }) }),
  listConversations: (query = "") => request(`/api/conversations${query ? `?q=${encodeURIComponent(query)}` : ""}`),
  getConversation: (id) => request(`/api/conversations/${id}`),
  renameConversation: (id, title) => request(`/api/conversations/${id}`, { method: "PATCH", body: JSON.stringify({ title }) }),
  deleteConversation: (id) => request(`/api/conversations/${id}`, { method: "DELETE" }),
};
