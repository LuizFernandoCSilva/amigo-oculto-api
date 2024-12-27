// src/__tests__/setup.ts
import { DataSource } from "typeorm";
import { AppDataSource } from "../DB/ormconfig";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});
