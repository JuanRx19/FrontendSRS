import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5108/api', // Reemplaza con la URL de tu backend
    withCredentials: true, // Importante para enviar cookies en solicitudes CORS
});

export default api;