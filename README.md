
# api-library

# Súmario

- [Contexto](#contexto)
- [Tecnologias usadas](#tecnologias-usadas)
- [Configuração inicial](#configuração-inicial)
- [Executando a aplicação](#executando-aplicação)
- [Testes](#testes)
- [Rotas](#testes)
	- [GET `/books`](#get-books)
    - [POST `/books`](#post-books)
    - [GET `/books/search`](#get-bookssearch)
	- [GET `/books/:id`](#get-booksid)
	- [PUT  `/books/:id`](#put-booksid)
	- [DELETE `/books/:id`](#delete-booksid)
	- [GET `/authors`](#get-authors)
	- [POST `/authors`](#post-authors)
	- [GET `/authors/search`](#get-authorssearch)
	- [GET  `/authors/:id`](#get-authorsid)
	- [PUT `/authors/:id`](#put-authorsid)
    - [DELETE `/authors/:id`](#delete-authorsid)

# Contexto
Neste projeto foi desenvolvida uma API RESTfil utilizando a arquitetura MVC e o banco de dados MongoDB.
A API trata-se de um sistema de gerenciamento de livros,  onde é possivel criar, visualizar, deletar e atualizar livros e authorsSearch

## Tecnologias usadas
> Desenvolvido usando Javascript, Node.js, Express, Mongoose e MongoDB.

## Configuração Inicial

Instale as dependências do projeto

```bash
npm install
```

Para que o projeto funcione corretamente será necessário criar um arquivo do tipo `.env` com as variaveis de ambiente referentes ao banco de dados e portas a serem utilizadas. 
```sh
MONGO_URL={Sua uri do MongoDB}
PORT={Porta em que o servidor irá rodar}
```
## Executando a aplicação

Para executar a aplicação normalmente:
```bash
npm start
```
Para executar em modo de desenvolvimento, com a ferramenta `Nodemon`, onde a cada vez que um arquivo é alterado, o servidor é reiniciado automaticamente, assim, não há a necessidade de utilizar o `npm start` a cada alteração feita nos arquivos.
```bash
npm run dev
```

## Testes
Em desenvolvimento

## Rotas
###  GET `/books`
Rota responsável por listar todos os produtos cadastrados na tabela `books`.

Exemplo de retorno com sucesso:
```json
 [
    {
        "_id": "624bccaea606da9d07e1147a",
        "title": "Livro1",
        "author": {
            "_id": "6255a4b4ab65937a2b1f9dbf",
            "name": "Autor2",
            "nationality": "Americano"
        },
        "publisher": "Editora1",
        "numberPages": 100,
        "__v": 0
    },
    {
        "_id": "624bd8688c369d891135de10",
        "title": "Livro2",
        "author": {
            "_id": "6259d9c6c7495a4007ae4511",
            "name": "Autor1",
            "nationality": "Brasileiro"
        },
        "publisher": "Editora1",
        "numberPages": 50,
        "__v": 0
    }
]
```
---
###  POST `/books`
Rota responsável por cadastrar novos produtos na tabela `books`. o `body` da requisição deve ter o seguinte formato:

```json
{
        "title": "Livro1",
        "author": "6255a4b4ab65937a2b1f9dbf",
        "publisher": "Editora1",
        "numberPages": 100,
}
```
Exemplo de retorno com sucesso:
```json
{
    "title": "Livro1",
    "author": "6255a4b4ab65937a2b1f9dbf",
    "publisher": "Editora1",
    "numberPages": 100,
    "_id": "625ddbbf9b8c11883f70f617",
    "__v": 0
}
```

#### Regras:
- Nenhum dos atributos poderá estar vazio;
- Atributo `author` deverá conter o id do autor referente a aquele livro.
- Atributo `numberPages` deve ser igual ou maior que `1`.
---

###  GET `/books/search`
Rota responsável por listar um livro especificado pelo `publisher` passado na rota.

Exemplo de rota
```js
/books/search?publishing=Editora1
```

Exemplo de retorno de uma `publisher` com múltiplos livros:
```json
   [
    {
        "_id": "624bccaea606da9d07e1147a",
        "title": "Livro1",
        "author": {
            "_id": "6255a4b4ab65937a2b1f9dbf",
            "name": "Autor2",
            "nationality": "Americano"
        },
        "publisher": "Editora1",
        "numberPages": 100,
        "__v": 0
    },
    {
        "_id": "624bd8688c369d891135de10",
        "title": "Livro2",
        "author": {
            "_id": "6259d9c6c7495a4007ae4511",
            "name": "Autor1",
            "nationality": "Brasileiro"
        },
        "publisher": "Editora1",
        "numberPages": 50,
        "__v": 0
    }
]
```
Quando o `author` não é encontrado:
```json
  { "message": "Error - Publisher not found" }
```
---
###  GET `/books/:id`
Rota responsável por listar uma venda especificada pelo `id` passado na rota.

Exemplo de retorno de uma venda com múltiplos produtos:
```json
   [
    { 
      "date": "2021-09-09T04:54:29.000Z",
      "product_id": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "product_id": 2,
      "quantity": 2
    }
  ]
```
Quando o `id` do livro não é encontrado:
```json
  { "message": "Error - Book not found" }
```
---

# Under construction :construction:


