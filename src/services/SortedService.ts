import NameRepository from "../repositories/NameRepository";
import SortedNameRepository from "../repositories/SortedNameRepository";
import transporter from "../config/emailconfig";
import dotenv from "dotenv";

dotenv.config();

export class SortedService {
  // Método para limpar tabelas
  async resetTables(): Promise<void> {
    try {
      // Limpa as tabelas usando o método de delete
      await NameRepository.clear();
      await SortedNameRepository.clear();
    } catch (error) {
      // Adiciona mais informações sobre o erro
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      throw new Error(
        `Erro ao limpar as tabelas NameRepository e SortedNameRepository: ${errorMessage}`
      );
    }
  }

  async sortedNames(): Promise<{ name: string; secretFriend: string }[]> {
    try {
      const result = await NameRepository.findAll();

      if (result.length < 2) {
        throw new Error(
          `É necessário pelo menos duas pessoas para sortear. Pessoas cadastradas: ${result.length}`
        );
      }

      const names = result.map((entry) => entry.name);
      const emails = result.map((entry) => entry.email);
      const availableNames = [...names];
      const sortedNames = [];

      for (let i = 0; i < names.length; i++) {
        let randomIndex = Math.floor(Math.random() * availableNames.length);

        while (names[i] === availableNames[randomIndex]) {
          randomIndex = Math.floor(Math.random() * availableNames.length);
        }

        sortedNames.push({
          name: names[i],
          secretFriend: availableNames[randomIndex],
        });

        availableNames.splice(randomIndex, 1);
      }

      try {
        await SortedNameRepository.saveSortedNames(
          result,
          sortedNames.map((pair) => pair.secretFriend)
        );
      } catch (saveError) {
        throw new Error(
          `Erro ao salvar os resultados do sorteio: ${
            saveError instanceof Error ? saveError.message : "Erro desconhecido"
          }`
        );
      }

      try {
        await Promise.all(
          sortedNames.map(async (sortedName, index) => {
            const recipientEmail = emails[index];
            const senderName = sortedName.name;
            const secretFriendName = sortedName.secretFriend;

            await transporter.sendMail({
              from: `"Amigo Oculto" <${process.env.EMAIL_USER}>`,
              to: recipientEmail,
              subject: "Seu amigo oculto foi sorteado!",
              text: `Olá ${senderName}, seu amigo oculto é ${secretFriendName}.`,
              html: `<p>Olá <b>${senderName}</b>, seu amigo oculto é <b>${secretFriendName}</b>.</p>`,
            });
          })
        );
      } catch (emailError) {
        const errorMessage =
          emailError instanceof Error
            ? emailError.message
            : "Erro desconhecido ao enviar e-mail";
        throw new Error(`Erro ao enviar e-mail: ${errorMessage}`);
      }

      await this.resetTables();
      return sortedNames;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      throw new Error(`Erro ao salvar nomes: ${errorMessage}`);
    }
  }
}

export default new SortedService();
