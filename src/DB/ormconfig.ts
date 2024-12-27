import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "sortedFriend",
  synchronize: false, // Desativar sincronização automática
  logging: false, // Ainda exibe outros logs, mas não os de criação de tabelas
  entities: ["src/entities/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) =>
    console.error("Erro ao conectar com o banco de dados:", error)
  );
