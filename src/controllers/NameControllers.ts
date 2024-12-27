import { Request, Response } from "express";
import NameService from "../services/nameService";

class NameController {
  // Função para salvar os nomes e emails
  async saveNames(req: Request, res: Response): Promise<Response> {
    const namesAndEmails = req.body;

    const duplicateNameandEmail = namesAndEmails.filter(
      (entry: { name: string; email: string }, index: number) =>
        namesAndEmails.findIndex(
          (item: { name: string; email: string }) =>
            item.name === entry.name && item.email === entry.email
        ) !== index
    );
    if (duplicateNameandEmail.length > 0) {
      return res.status(400).json({
        message: `Os seguintes nomes e emails são duplicados: ${[...new Set(duplicateNameandEmail.map((entry: { name: string; email: string }) => `${entry.name} - ${entry.email}`))].join(", ")}`,
      });
    }

    // Verificação de duplicação de nomes
    const duplicateNames = namesAndEmails.filter(
      (entry: { name: string }, index: number) =>
        namesAndEmails.findIndex(
          (item: { name: string }) => item.name === entry.name
        ) !== index
    );
    if (duplicateNames.length > 0) {
      return res.status(400).json({
        message: `Os seguintes nomes são duplicados: ${[...new Set(duplicateNames.map((entry: { name: string }) => entry.name))].join(", ")}`,
      });
    }

    // Verificação de duplicação de emails
    const duplicateEmails = namesAndEmails.filter(
      (entry: { email: string }, index: number) =>
        namesAndEmails.findIndex(
          (item: { email: string }) => item.email === entry.email
        ) !== index
    );
    if (duplicateEmails.length > 0) {
      return res.status(400).json({
        message: `Os seguintes emails são duplicados: ${[...new Set(duplicateEmails.map((entry: { email: string }) => entry.email))].join(", ")}`,
      });
    }

    // Salva no banco de dados usando o serviço, caso não haja duplicação
    try {
      const savedNames = await NameService.saveNames(
        namesAndEmails.map(
          (entry: { name: string; email: string }) => entry.name
        ),
        namesAndEmails.map(
          (entry: { name: string; email: string }) => entry.email
        )
      );
      return res.status(200).json({
        message: "Nomes e emails salvos com sucesso",
        savedNames,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }

  // Função para pegar todos os nomes
  async getAllNames(req: Request, res: Response): Promise<Response> {
    try {
      const names = await NameService.getAllNames();
      return res.status(200).json(names);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
      return res.status(500).json({
        message: "Erro ao buscar os nomes",
      });
    }
  }
}

export default new NameController();
