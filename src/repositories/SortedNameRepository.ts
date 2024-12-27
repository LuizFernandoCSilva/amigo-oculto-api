import { Repository } from "typeorm";
import { AppDataSource } from "../DB/ormconfig";
import { SortedName } from "../entities/SortedName";
import { Name } from "../entities/Name"; // Importando a entidade 'Name'

export class SortedNameRepository {
  private repository: Repository<SortedName>;

  constructor() {
    this.repository = AppDataSource.getRepository(SortedName);
  }

  // Método para salvar os nomes com amigos ocultos, associando o 'nameId' corretamente
  async saveSortedNames(
    names: Name[],
    secretFriends: string[]
  ): Promise<SortedName[]> {
    const sortedNamesEntities = [];

    for (let i = 0; i < names.length; i++) {
      const nameEntity = names[i];

      // Criando o objeto 'SortedName' com a chave estrangeira 'nameId' associada
      sortedNamesEntities.push(
        this.repository.create({
          name: nameEntity, // Associando o nome encontrado (entidade 'Name')
          secretFriend: secretFriends[i], // Nome do amigo oculto
        })
      );
    }

    return await this.repository.save(sortedNamesEntities); // Salva no banco de dados
  }

  // Método para buscar todos os nomes e seus amigos ocultos
  async findAll(): Promise<SortedName[]> {
    return await this.repository.find({ relations: ["name"] }); // Inclui o nome associado (relacionamento)
  }

  async clear(): Promise<void> {
    await this.repository.clear();
  }
}

export default new SortedNameRepository();
