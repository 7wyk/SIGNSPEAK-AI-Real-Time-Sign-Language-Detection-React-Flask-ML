import axios from 'axios';
import { API_BASE_URL, TOKEN_KEY } from '../utils/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    register: (username, password) =>
        api.post('/register', { username, password }),

    login: (username, password) =>
        api.post('/login', { username, password }),
};

// Detection API
export const detectionAPI = {
    start: () => api.post('/start_detection'),
    stop: () => api.post('/stop_detection'),
    getPrediction: () => api.get('/get_prediction'),
    getVideoFeed: () => `${API_BASE_URL}/video_feed`,
};

// Translation API
export const translationAPI = {
    translate: (text, language) =>
        api.post('/translate', { text, language }),
};

// Feedback API
export const feedbackAPI = {
    submit: (feedback) =>
        api.post('/feedback', { feedback }),
};

export default api;
