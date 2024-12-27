import { Request, Response } from "express";
import nameService from "../services/nameService";
import NameController from "../controllers/NameControllers";

describe("NameController", () => {
  describe("saveNames", () => {
    it("should return 400 if there are duplicate emails", async () => {
      const req = {
        body: [
          { name: "John", email: "john@example.com" },
          { name: "Doe", email: "john@example.com" },
        ],
      } as Request; // Agora isso é tratado como um Request do Express

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock da função saveNames para simular a lógica de salvamento
      const mockSaveNames = jest
        .spyOn(nameService, "saveNames")
        .mockResolvedValue([]);

      // Chama o controlador passando o req e res simulados
      await NameController.saveNames(req, res);

      // Verifica se o status 400 foi chamado
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Os seguintes emails são duplicados: john@example.com",
      });

      // Verifica se a função saveNames não foi chamada devido à duplicação
      expect(mockSaveNames).not.toHaveBeenCalled();
    });
  });
  it("should return 400 if there are duplicate names", async () => {
    const req = {
      body: [
        { name: "John", email: "john@example.com" },
        { name: "John", email: "john2@example.com" },
      ],
    } as Request; // Agora isso é tratado como um Request do Express

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock da função saveNames para simular a lógica de salvamento
    const mockSaveNames = jest
      .spyOn(nameService, "saveNames")
      .mockResolvedValue([]);

    // Chama o controlador passando o req e res simulados
    await NameController.saveNames(req, res);

    // Verifica se o status 400 foi chamado
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Os seguintes nomes são duplicados: John",
    });

    // Verifica se a função saveNames não foi chamada devido à duplicação
    expect(mockSaveNames).not.toHaveBeenCalled();
  });

  it("should return 400 if there are duplicate name and email", async () => {
    const req = {
      body: [
        { name: "John", email: "john@example.com" },
        { name: "John", email: "john@example.com" },
      ],
    } as Request; // Agora isso é tratado como um Request do Express

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock da função saveNames para simular a lógica de salvamento
    const mockSaveNames = jest
      .spyOn(nameService, "saveNames")
      .mockResolvedValue([]);

    // Chama o controlador passando o req e res simulados
    await NameController.saveNames(req, res);

    // Verifica se o status 400 foi chamado
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "Os seguintes nomes e emails são duplicados: John - john@example.com",
    });

    // Verifica se a função saveNames não foi chamada devido à duplicação
    expect(mockSaveNames).not.toHaveBeenCalled();
  });
  it("should return 200 and success message if names and emails are saved successfully", async () => {
    // Mock do corpo da requisição com dados válidos
    const req = {
      body: [
        { name: "John", email: "john@example.com" },
        { name: "Doe", email: "doe@example.com" },
      ],
    } as Request; // Agora isso é tratado como um Request do Express

    // Mock da resposta
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock da função saveNames para simular a lógica de salvamento
    const mockSaveNames = jest
      .spyOn(nameService, "saveNames")
      .mockResolvedValue(["John", "Doe"]); // Agora retorna apenas os nomes

    // Chama o método saveNames do controlador com o corpo correto
    await NameController.saveNames(req, res);

    // Verifica se o status 200 foi chamado (sucesso)
    expect(res.status).toHaveBeenCalledWith(200);

    // Verifica se a mensagem de sucesso foi chamada com a resposta correta
    expect(res.json).toHaveBeenCalledWith({
      message: "Nomes e emails salvos com sucesso",
      savedNames: ["John", "Doe"], // Espera apenas os nomes, sem o email
    });

    // Verifica se a função saveNames foi chamada com os parâmetros corretos
    expect(mockSaveNames).toHaveBeenCalledWith(
      ["John", "Doe"], // Lista de nomes
      ["john@example.com", "doe@example.com"] // Lista de emails
    );
  });
});
