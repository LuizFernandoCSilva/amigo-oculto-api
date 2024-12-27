import NameRepository from "../repositories/NameRepository";
import NameService from "../services/nameService";

describe("Testando o NameService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("A quantidade de nomes e emails deve ser igual", async () => {
    const names = ["Nome1", "Nome2", "Nome3"];
    const emails = ["exemplo1@gmail.com", "exemplo2@gmail.com"];

    const saveNamesSpy = jest
      .spyOn(NameRepository, "save")
      .mockResolvedValueOnce([]);

    // Verifica se a função lança um erro quando o número de nomes e emails é diferente
    await expect(NameService.saveNames(names, emails)).rejects.toThrowError(
      "O número de nomes e emails deve ser igual"
    );

    // Verifica se a função save não foi chamada
    expect(saveNamesSpy).toHaveBeenCalledTimes(0);
  });

  it("Deve salvar os nomes e emails no banco de dados", async () => {
    const names = ["Nome1", "Nome2", "Nome3"];
    const emails = [
      "exemplo1@gmail.com",
      "exemplo2@gmail.com",
      "exemplo3@gmail.com",
    ];

    const saveNamesSpy = jest
      .spyOn(NameRepository, "save")
      .mockResolvedValueOnce([]);

    // Chama a função e espera o resultado
    const result = await NameService.saveNames(names, emails);

    // Verifica se a função save foi chamada
    expect(saveNamesSpy).toHaveBeenCalledTimes(1);

    // Verifica se o resultado é o esperado
    expect(result).toEqual(["NOME1", "NOME2", "NOME3"]);
  });
});
