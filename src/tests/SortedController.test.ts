import { Request, Response } from "express";
import SortedController from "../controllers/SortedControllers";
import NameRepository from "../repositories/NameRepository";
import SortedNameRepository from "../repositories/SortedNameRepository";
import SortedService from "../services/SortedService";

jest.mock("../repositories/NameRepository");
jest.mock("../repositories/SortedNameRepository");
jest.mock("../services/SortedService");

describe("Testing the SortedController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return an error when trying to sort less than two people", async () => {
    const req = {}; // Mock do req
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Simulando o erro quando menos de duas pessoas são passadas
    const sortedNamesSpy = jest
      .spyOn(SortedService, "sortedNames")
      .mockRejectedValue(
        new Error("É necessário pelo menos duas pessoas para sortear.")
      ); // Simula o erro

    await SortedController.sortNames(req as Request, res as Response);

    // Verifica se o status 400 foi chamado e a mensagem de erro correta foi retornada
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "É necessário pelo menos duas pessoas para sortear.",
    });

    // Verifica se o método sortedNames foi chamado
    expect(sortedNamesSpy).toHaveBeenCalled();
  });

  it("should return status 200 and the sorted names", async () => {
    const req = {}; // Mock do req
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Simulando o retorno correto
    const sortedNamesSpy = jest
      .spyOn(SortedService, "sortedNames")
      .mockResolvedValue([
        { name: "John", secretFriend: "Doe" },
        { name: "Doe", secretFriend: "John" },
      ]);

    await SortedController.sortNames(req as Request, res as Response);

    // Verifica se o status 200 foi chamado e o resultado foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Nomes ordenados com sucesso.",
      result: [
        { name: "John", secretFriend: "Doe" },
        { name: "Doe", secretFriend: "John" },
      ],
    });

    // Verifica se o método sortedNames foi chamado
    expect(sortedNamesSpy).toHaveBeenCalled();
  });
});
