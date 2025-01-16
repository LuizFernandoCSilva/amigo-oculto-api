# Amigo Oculto - Frontend

Este é o frontend da aplicação **Amigo Oculto**, que permite aos usuários participar de um jogo de amigo oculto online. O frontend foi desenvolvido utilizando **React** com **Vite**, **Tailwind CSS** para estilização e **Axios** para comunicação com a API backend.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **Vite**: Ferramenta de build rápida e moderna para desenvolvimento com React.
- **Tailwind CSS**: Framework utilitário-first para estilização.
- **Axios**: Biblioteca para fazer requisições HTTP ao backend.

## Pré-requisitos

Antes de rodar o projeto, verifique se você tem o **Node.js** e o **npm/yarn** instalados na sua máquina.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
- ou [yarn](https://yarnpkg.com/) (caso prefira usar o Yarn)

## Instalação

1. **Clone o repositório:**

   Primeiro, clone o repositório do frontend para sua máquina local:

   ```bash
   git clone https://github.com/LuizFernandoCSilva/amigo-oculto-api.git
   cd amigo-oculto-frontend
   ```

2. **Instale as dependências:**

   Execute o comando abaixo para instalar as dependências do projeto:

   Com **npm**:

   ```bash
   npm install
   ```

   ou com **yarn**:

   ```bash
   yarn install
   ```

3. **Configuração do Axios:**

   Certifique-se de que o endpoint do backend está configurado corretamente no seu arquivo de configuração do Axios. O arquivo pode ser encontrado em `src/axios.js` ou dentro de qualquer arquivo onde você esteja fazendo as requisições HTTP.

   Exemplo de configuração no `src/axios.js`:

   ```js
   import axios from "axios";

   const api = axios.create({
     baseURL: "https://seu-backend-url.com/api", // Substitua com a URL do seu backend
   });

   export default api;
   ```

4. **Rodando o projeto:**

   Agora você pode rodar o projeto em modo de desenvolvimento. Execute o comando abaixo:

   Com **npm**:

   ```bash
   npm run dev
   ```

   ou com **yarn**:

   ```bash
   yarn dev
   ```

   Isso irá iniciar o servidor de desenvolvimento, e você poderá acessar a aplicação em `http://localhost:3000`.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
amigo-oculto-frontend/
├── public/                # Arquivos públicos como o index.html
├── src/                   # Código-fonte do aplicativo
│   ├── assets/            # Imagens e outros recursos
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/             # Páginas do aplicativo
│   ├── App.jsx            # Componente principal do aplicativo
│   ├── config             # Configuração do Axios com o backend
│   └── main.jsx           # Ponto de entrada do aplicativo
├── tailwind.config.js     # Configuração do Tailwind CSS
├── vite.config.js         # Configuração do Vite
├── package.json           # Dependências e scripts do projeto
└── README.md              # Este arquivo
```

## Configuração do Tailwind CSS

O Tailwind CSS está pré-configurado no projeto. Caso queira customizar a configuração, edite o arquivo `tailwind.config.js`.

Exemplo de configuração para adicionar cores personalizadas:

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: "#FF5733",
      },
    },
  },
  plugins: [],
};
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
