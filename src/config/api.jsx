// api.jsx
import axios from "axios";

// Criando uma instância global do axios
const api = axios.create({
  baseURL: "http://localhost:8000", // URL do seu backend
  timeout: 5000, // Tempo de espera para a requisição
  headers: {
    "Content-Type": "application/json", // Cabeçalhos padrão
  },
});

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response, // Se a resposta for bem-sucedida, retorna normalmente
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

export default api;
