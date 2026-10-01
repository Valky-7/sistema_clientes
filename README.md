# sistema_clientes

# API RESTful com Node.js e MySQL

API RESTful desenvolvida com **Node.js**, **Express** e **MySQL**, com o objetivo de realizar operações de cadastro, consulta, atualização e exclusão de **clientes e produtos**.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- MySQL2
- dotenv
- Nodemon
- Insomnia/Postman para testes

## Estrutura do projeto

```text
api-clientes/
├── .env
├── .env.example
├── .gitignore
├── README.md
├── db.js
├── index.js
├── package.json
├── package-lock.json
├── script_banco.sql
├── routes/
│   ├── clientes.js
│   └── produtos.js
└── testes/
    └── api-clientes.json
```

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- MySQL ou MariaDB
- Git

Também é recomendado utilizar o **VS Code** para editar o projeto.

## Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd api-clientes
```

Instale as dependências:

```bash
npm install
```

## Configuração do banco de dados

Crie o banco de dados e as tabelas utilizando o arquivo:

```text
script_banco.sql
```

O projeto utiliza o banco:

```text
sistema_clientes
```

O script SQL contém a criação das tabelas necessárias para o funcionamento da API e os dados iniciais para testes.

O banco possui as tabelas:

- `clientes`
- `produtos`

## Configuração das variáveis de ambiente

Crie um arquivo chamado `.env` na raiz do projeto.

Utilize o arquivo `.env.example` como modelo:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=sistema_clientes
```

Configure os valores de acordo com o seu ambiente.

### Exemplo

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=sistema_clientes
```

> O arquivo `.env` não deve ser enviado para o GitHub, pois pode conter informações sensíveis.

## Executando o projeto

Para iniciar a API em modo de desenvolvimento:

```bash
npm run dev
```

Se tudo estiver configurado corretamente, será exibida uma mensagem semelhante a:

```text
Servidor rodando na porta 3000
```

A API estará disponível em:

```text
http://localhost:3000
```

## Endpoints da API

### Clientes

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/clientes` | Cadastrar cliente |
| GET | `/clientes` | Listar clientes |
| GET | `/clientes/:id` | Buscar cliente por ID |
| PUT | `/clientes/:id` | Atualizar cliente completamente |
| PATCH | `/clientes/:id` | Atualizar cliente parcialmente |
| DELETE | `/clientes/:id` | Excluir cliente |

### Produtos

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/produtos` | Cadastrar produto |
| GET | `/produtos` | Listar produtos |
| GET | `/produtos/:id` | Buscar produto por ID |
| PUT | `/produtos/:id` | Atualizar produto completamente |
| PATCH | `/produtos/:id` | Atualizar produto parcialmente |
| DELETE | `/produtos/:id` | Excluir produto |

## Exemplos de requisições

### Cadastrar cliente

**POST**

```text
http://localhost:3000/clientes
```

Body:

```json
{
  "nome": "João da Silva",
  "email": "joao@email.com",
  "telefone": "47999999999"
}
```

### Listar clientes

**GET**

```text
http://localhost:3000/clientes
```

### Buscar cliente por ID

**GET**

```text
http://localhost:3000/clientes/1
```

### Atualizar cliente

**PUT**

```text
http://localhost:3000/clientes/1
```

Body:

```json
{
  "nome": "João da Silva",
  "email": "joao.novo@email.com",
  "telefone": "47988888888",
  "status": "ativo"
}
```

### Atualização parcial

**PATCH**

```text
http://localhost:3000/clientes/1
```

Body:

```json
{
  "telefone": "47977777777"
}
```

### Excluir cliente

**DELETE**

```text
http://localhost:3000/clientes/1
```

## Testes da API

Os endpoints da API foram testados utilizando **Insomnia/Postman**.

A coleção de testes exportada está disponível no diretório:

```text
testes/
```

Ela contém requisições para demonstrar o funcionamento dos principais endpoints de clientes e produtos.

## Banco de dados

O projeto utiliza o MySQL para armazenamento dos dados.

A conexão é realizada através do arquivo:

```text
db.js
```

As configurações de conexão são obtidas através das variáveis de ambiente definidas no arquivo `.env`.

## Segurança

O arquivo `.env` contém configurações que não devem ser expostas publicamente.

Por isso, o projeto possui um `.gitignore` que impede o envio desses arquivos para o repositório:

```gitignore
node_modules/
.env
```

O arquivo `.env.example` deve ser utilizado para indicar quais variáveis são necessárias para executar o projeto.

## Controle de versão

O projeto utiliza Git e GitHub para controle de versão.

Os commits devem representar as etapas de desenvolvimento do projeto, mantendo um histórico organizado e coerente.

Exemplo de commit final:

```bash
git add .
git commit -m "feat: finaliza API RESTful e documentação do projeto"
git push
```

## Autor

Projeto desenvolvido como atividade do curso técnico de **Informática para Internet — SENAI**.