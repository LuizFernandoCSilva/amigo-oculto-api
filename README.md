# Amigo Oculto

Este é um projeto de sorteio de **amigo oculto**, desenvolvido com **Node.js**, utilizando o **Nodemailer** para envio de e-mails. O sistema permite que os participantes sejam cadastrados e, após o sorteio, as informações sejam enviadas por e-mail aos participantes.

## Funcionalidades

- Cadastro de participantes do amigo oculto.
- Sorteio automático de amigos ocultos.
- Envio de e-mails aos participantes com as informações do sorteio.
- Tratamento de erros para garantir a integridade do sorteio e envio de mensagens.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/): Ambiente de execução para JavaScript.
- [Express](https://expressjs.com/): Framework para criação de APIs.
- [TypeScript](https://www.typescriptlang.org/): Superset de JavaScript para tipagem estática.
- [Nodemailer](https://nodemailer.com/): Biblioteca para envio de e-mails.
- [Jest](https://jestjs.io/): Framework de testes.
- [Swagger](https://swagger.io/): Ferramenta para documentação e teste de APIs.

## Requisitos

- Node.js (v16 ou superior)
- NPM (v8 ou superior) ou Yarn
- Conta de e-mail (exemplo: Gmail) configurada para envio de mensagens

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/LuizFernandoCSilva/amigo-oculto-api
cd amigooculto
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=sua-senha
```

> **Nota:** Certifique-se de habilitar o acesso de aplicativos menos seguros para o e-mail ou configure uma senha de aplicação.

## Uso

1. Inicie o servidor:

```bash
npm run start:dev
```

2. Acesse a API para cadastrar participantes e realizar o sorteio. Acesse o http://localhost:8000/api-docs/#/default/post_sortnames para se informar sobre os endpoint disponivéis.

## Testes

Execute os testes com o seguinte comando:

```bash
npm test
```

O sistema inclui testes unitários para validação da lógica do sorteio e envio de e-mails, e recebimento dos dados.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Fork o repositório.
2. Crie uma branch com a sua feature ou correção: `git checkout -b minha-feature`.
3. Realize os commits: `git commit -m 'Minha nova feature'`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

Feito com ❤ por [Luiz Fernando Costa Silva](https://github.com/LuizFernandoCSilva).
