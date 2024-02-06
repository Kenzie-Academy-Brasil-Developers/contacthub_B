# Documentação da API - Contact Hub

## Tópicos de conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Tecnologias usadas no desenvolvimento desta api:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

A URL base da aplicação em produção: https://contacthubws.onrender.com
---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)


Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](DER_SP7_01.drawio.png)

---

## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
npm install
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---
## 4. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)

-É preciso estar autenticado para acessar as seguintes rotas:
| Método   | Rota(USER) | 
|----------|------------| 
| GET      | /users/all/users| 
| GET      | /users/:id|  
| PATCH      |/users/:id| 
| DELETE     |/users/:id| 
| POST      |/contact| 
| GET      |/contact/:id| 
| GET      |/contact/all/contacts| 
| PATCH     |/contact/:id|
| DELETE     |/contact/:id|


A autenticação é feita por meio do Login (|POST | /login|), gerando um token(Bearer Token) de acesso.

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
  - [POST - /users](#11-criação-de-usuário)
  - [GET - /users/all/users](#12-listando-usuários)
  - [GET - /users/:id](#13-listar-usuário-por-id)
  - [PATCH - /users/:id](#14-atualizando-usuário)
  - [DELETE - /users/:id](#15-deletando-usuário)
- [Contacts](#2-contacts)
  - [POST - /contact](#11-criação-de-contato)
  - [GET - /contact/all/contacts](#12-listando-contatos)
  - [GET - /contact/:id](#13-listar-contato-por-id)
  - [PATCH - contact/:id](#14-atualizando-contato)
  - [DELETE - /contact/:id](#12-deletando-contato)
- [Login](#3-login)
  - [POST - /login](#11-logando-um-usuário)
---

## 1. **Users**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo          | Tipo   | Descrição                                       |
| ---------------|--------|-------------------------------------------------|
| id             | number | Identificador único do usuário                  |
| name           | string | O nome do usuário.                              |
| email          | string | O e-mail do usuário.                            |
| password       | string | A senha de acesso do usuário                    |
| contactNumber  | number | A senha de acesso do usuário                    |
| admin          | boolean| Define se um usuário é Administrador ou não.    |
| createdAt      | date   | Data de criação do usuário                      |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /users     | Criação de um usuário.                  |
| GET      | /users     | Lista todos os usuários                 |
| GET      | /users/:id | Lista um usuário usando seu ID como parâmetro|
| PATCH      |/users/:id| Atualização de um usuário usando seu id como parâmetro|
| DELETE     |/users/:id| Deleção de um usuário usando seu id como parâmetro|
---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "user",
	"email": "user@mail.com",
	"password": "1234",
	"admin": true,
}
```

```
201 Created
```
```json
{
	"id": "1",
	"name": "user",
	"email": "user@mail.com",
	"isAdm": true,
	"createdAt": 06/02/2023
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already registered. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/all/users`

### Exemplo de Request:
```
GET /users
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "1",
		"name": "user",
		"email": "user@mail.com",
		"isAdm": true
		"createdAt": 06/02/2024
	}
]
```

### Possíveis Erros:
Se nenhum usuário cadastrado, irá retornar uma lista vazia.

---

### 1.3. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:
```
GET /users/1
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
|      id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "1",
	"name": "user",
	"email": "user@mail.com",
	"isAdm": true,
	"createdAt": 06/02/2024
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | User not found. |


### 1.4. **Atualização de usuários por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:
```
GET /users/1
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
|      id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
	"name": "user2",
	"email": "user2@mail.com",
	"password": 12345
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "1",
	"name": "user2",
	"email": "user2@mail.com",
	"isAdm": true,
	"createdAt": 06/02/2024
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | User not found. |
| 409 Conflict   | Email already registered.|
| 409 Conflict   | Phone number already registered.|
| 409 Conflict   | Name number already registered.|

### 1.5. **Deleção de usuários por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:
```
GET /users/1
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
|      id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
vazio
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | User not found. |
