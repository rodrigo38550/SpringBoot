import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Ajouter le token d'authentification à chaque requête si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API
export const login = (username, password) =>
  api.post("/auth/login", { username, password });

export const fetchNotes = () => api.get("/notes");

export const createNote = (content) =>
  api.post("/note", { content });

export const updateNote = (id, content) =>
  api.put(`/notes/${id}`, { content });

export const deleteNote = (id) => api.delete(`/notes/${id}`);

export const fetchCurrentUser = () => api.get("/auth/me");
