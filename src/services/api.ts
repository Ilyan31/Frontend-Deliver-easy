import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Assurez-vous que le backend écoute sur ce port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;