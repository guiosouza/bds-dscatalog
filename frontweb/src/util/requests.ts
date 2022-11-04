
// Pega uma variável de ambiente;
// Acessar ambiente onde a aplicação roda em .REACT_APP_BACKEND_URL;
// Acessar ambiente onde a aplicação roda em .REACT_APP_BACKEND_URL;
// Caso .REACT_APP_BACKEND_URL não esteja definida, irá acessar o padrão 'http://localhost:8080';
export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';



