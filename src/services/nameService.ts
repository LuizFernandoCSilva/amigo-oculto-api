import NameRepository from "../repositories/NameRepository";

class NameService {
  async saveNames(names: string[], emails: string[]): Promise<string[]> {
    try {
      if (names.length !== emails.length) {
        throw new Error("O número de nomes e emails deve ser igual");
      }

      // Processa os nomes e emails para uppercase e lowercase, respectivamente
      const processedNames = names.map((name) => name.trim().toUpperCase());
      const processedEmails = emails.map((email) => email.trim().toLowerCase());

      // Salva no banco de dados usando o repository
      await NameRepository.save(processedNames, processedEmails);

      return processedNames;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Erro ao salvar nomes e emails: " + error.message);
      } else {
        throw new Error("Erro ao salvar nomes e emails");
      }
    }
  }

  async getAllNames(): Promise<string[]> {
    try {
      const names = await NameRepository.findAll();
      return names.map((name) => name.name);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Erro ao buscar nomes: " + error.message);
      } else {
        throw new Error("Erro ao buscar nomes");
      }
    }
  }
}

  export default new NameService();
