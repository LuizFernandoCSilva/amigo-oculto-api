import { Request, Response } from "express";
import SortedService from "../services/SortedService";

class SortedController {
  async sortNames(req: Request, res: Response): Promise<Response> {
    try {
      // Chama o serviço para ordenar e salvar os nomes
      const result = await SortedService.sortedNames();

      return res.status(200).json({
        message: "Nomes ordenados com sucesso.",
        result,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "É necessário pelo menos duas pessoas para sortear."
      ) {
        // Retorna um erro específico quando há menos de duas pessoas
        return res.status(400).json({
          message: error.message,
        });
      }
      return res.status(500).json({
        message: "Erro interno do servidor.",
      });
    }
  }
}

export default new SortedController();
