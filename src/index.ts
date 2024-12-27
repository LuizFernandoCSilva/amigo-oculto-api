import express from "express";
import cors from "cors";
import { config } from "dotenv";
import nameRoutes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json"; 

import "reflect-metadata";

// Função principal de inicialização do servidor
const main = async () => {
  config();
  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware para analisar o corpo das requisições como JSON
  app.use(express.json());

  // Habilitando o CORS
  app.use(cors());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Usando o router importado
  app.use("/", nameRoutes);

  // Inicia o servidor
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

main();
