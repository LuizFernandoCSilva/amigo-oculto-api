import { Repository } from "typeorm";
import { AppDataSource } from "../DB/ormconfig";
import { Name } from "../entities/Name";
import { SortedName } from "../entities/SortedName";

export class NameRepository {
  private repository: Repository<Name>;

  constructor() {
    this.repository = AppDataSource.getRepository(Name);
  }

  async save(names: string[], emails: string[]): Promise<Name[]> {
    const nameEntities = names.map((name, index) =>
      this.repository.create({ name, email: emails[index] })
    );

    return await this.repository.save(nameEntities);
  }

  async findAll(): Promise<Name[]> {
    return await this.repository.find();
  }

  async clear(): Promise<void> {
    // Aqui trocamos TRUNCATE por DELETE para garantir que as chaves estrangeiras não causem erro
    await AppDataSource.getRepository(SortedName).delete({}); // Exclui todos os registros da tabela 'sorted_names'
    await this.repository.delete({}); // Exclui todos os registros da tabela 'names'
  }
}

export default new NameRepository();
