import NameRepository from "../repositories/NameRepository";
import SortedNameRepository from "../repositories/SortedNameRepository";
import SortedService from "../services/SortedService";
import transporter from "../config/emailconfig";

jest.mock("../config/emailconfig");

describe("Testando o SortedService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve sortear nomes e enviar e-mails corretamente", async () => {
    // Mock dos dados retornados pelo NameRepository
    const mockNames = [
      { id: 1, name: "João", email: "joao@example.com" },
      { id: 2, name: "Maria", email: "maria@example.com" },
    ];

    jest.spyOn(NameRepository, "findAll").mockResolvedValue(mockNames);
    jest.spyOn(SortedNameRepository, "saveSortedNames").mockResolvedValue([]);

    // Mock do transporter para simular envio de e-mail
    const sendMailMock = jest.fn().mockResolvedValue({});
    (transporter.sendMail as jest.Mock).mockImplementation(sendMailMock);

    const result = await SortedService.sortedNames();

    // Verifica se o resultado contém os pares de amigo secreto
    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "João", secretFriend: "Maria" }),
        expect.objectContaining({ name: "Maria", secretFriend: "João" }),
      ])
    );

    // Verifica se o método sendMail foi chamado
    expect(sendMailMock).toHaveBeenCalledTimes(2);

    // Verifica os parâmetros do envio de e-mail
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining("Amigo Oculto"),
        to: "joao@example.com",
        subject: "Seu amigo oculto foi sorteado!",
      })
    );
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining("Amigo Oculto"),
        to: "maria@example.com",
        subject: "Seu amigo oculto foi sorteado!",
      })
    );
  });

  it("Deve retornar um erro ao tentar sortear menos de duas pessoas", async () => {
    const findAllSpy = jest
      .spyOn(NameRepository, "findAll")
      .mockResolvedValueOnce([
        { id: 1, name: "Nome1", email: "nome1@example.com" },
      ]); // Mock para retornar apenas uma pessoa

    const saveSortedNamesSpy = jest
      .spyOn(SortedNameRepository, "saveSortedNames")
      .mockResolvedValueOnce([]); // Mock para monitorar, mas não será chamado

    await expect(SortedService.sortedNames()).rejects.toThrow(
      "É necessário pelo menos duas pessoas para sortear. Pessoas cadastradas: 1"
    );

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(saveSortedNamesSpy).toHaveBeenCalledTimes(0);
  });

  it("Deve sortear corretamente os nomes e salvar no banco de dados", async () => {
    jest.setTimeout(20000); // Aumentando o timeout para 20 segundos

    // Mock para a função findAll que retorna os nomes
    const findAllSpy = jest
      .spyOn(NameRepository, "findAll")
      .mockResolvedValueOnce([
        { id: 1, name: "Nome1", email: "nome1@example.com" },
        { id: 2, name: "Nome2", email: "nome2@example.com" },
        { id: 3, name: "Nome3", email: "nome3@example.com" },
        { id: 4, name: "Nome4", email: "nome4@example.com" },
      ]);

    // Mock para a função saveSortedNames
    const saveSortedNamesSpy = jest
      .spyOn(SortedNameRepository, "saveSortedNames")
      .mockResolvedValueOnce([]);

    // Chama a função e espera o resultado
    const result = await SortedService.sortedNames();

    // Verifique se findAll foi chamada
    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(saveSortedNamesSpy).toHaveBeenCalledTimes(1);

    // Verificando o número de sorteios
    expect(result).toHaveLength(4); // O número de sorteios deve ser igual ao número de pessoas

    // Verificando se os amigos secretos são únicos
    const uniqueSecretFriends = new Set(
      result.map((pair) => pair.secretFriend)
    );
    expect(uniqueSecretFriends.size).toBe(result.length); // Todos os amigos secretos devem ser únicos

    // Verificando se ninguém sorteou a si mesmo
    result.forEach((entry) => {
      expect(entry.name).not.toBe(entry.secretFriend); // Ninguém deve sortear a si mesmo
    });
  });

  it("Deve excluir os dados das tabelas NameRepository e SortedNameRepository", async () => {
    const clearSpy = jest
      .spyOn(NameRepository, "clear")
      .mockResolvedValueOnce();
    const clearSortedSpy = jest
      .spyOn(SortedNameRepository, "clear")
      .mockResolvedValueOnce();

    await SortedService.resetTables();

    expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(clearSortedSpy).toHaveBeenCalledTimes(1);
  });
});
