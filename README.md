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
Rota responsável por listar todos os livros cadastrados na tabela `books`.

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
Rota responsável por cadastrar novos livros na tabela `books`. o `body` da requisição deve ter o seguinte formato:

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
/books/search?publisher=Editora1
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
Quando o `publisher` não é encontrado:
```json
  { "message": "Error - Publisher not found" }
```
---
###  GET `/books/:id`
Rota responsável por listar um livro especificado pelo `id` passado na rota.

Exemplo de retorno de um livro:
```json
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
    }
```
Quando o `id` do livro não é encontrado:
```json
  { "message": "Error - Book not found" }
```
---
###  PUT `/books/:id`
Rota responsável por atualizar os dados de uma livro específico na tabela `books`. O `id` do livro deve ser passada na rota, e o `body` da requisição deve ter o seguinte formato:

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
  { "message": "Book updated successful" }
```
Quando o `id` do livro não é encontrado:
```json
  { "message": "Error - Error on update book"}
```

#### Regras:
- Atributo `numberPages` deve ser igual ou maior que `1`.
- Atributo `author` deverá conter o `id` do autor .
---
###  DELETE `/books/:id`
Rota responsável por remover um livro da tabela `books` com base no `id` passado na requisição.

Exemplo de retorno com sucesso:
```
  { "message": "Book deleted succesful" }
```
Quando o `id` do produto a ser deletado não é encontrado:
```json
  { "message": "Error - Error on delete book"}
```
---
###  GET `/authors`
Rota responsável por listar todos os autores cadastrados na tabela `authors`.

Exemplo de retorno com sucesso:
```json
 [
    {
        "_id": "6255a4b4ab65937a2b1f9dbf",
        "name": "Autor1",
        "nationality": "Americano"
    },
    {
        "_id": "6259d9c6c7495a4007ae4511",
        "name": "Autor2",
        "nationality": "Brasileiro"
    }
]
```
---
###  POST `/authors`
Rota responsável por cadastrar novos autores na tabela `authors`. o `body` da requisição deve ter o seguinte formato:

```json
{
    "name": "Autor1",
    "nationality": "Americano"
}
```
Exemplo de retorno com sucesso:
```json
{
    "name": "Autor1",
    "nationality": "Americano",
    "_id": "625ef6a59083a0cfe9db5d2e"
}
```

#### Regras:
- Atributos `name` e `nationality` não podem estar vazios;
---

###  GET `/authors/search`
Rota responsável por listar um autor especificado pelo `name` passado na rota.

Exemplo de rota
```js
/authors/search?name=Autor1
```

Exemplo de retorno de um `author`:
```json
   {
        "_id": "625ef6a59083a0cfe9db5d2e",
        "name": "Autor1",
        "nationality": "Brasileiro"
    }
```
Quando o `author` não é encontrado:
```json
  { "message": "Error - Author not found" }
```
---
###  GET `/authors/:id`
Rota responsável por listar um autor especificado pelo `id` passado na rota.

Exemplo de retorno de um autor:
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
  { "message": "Error - Author id not found" }
```
---
###  PUT `/authors/:id`
Rota responsável por atualizar os dados de um autor específico na tabela `authors`. O `id` do autor deve ser passada na rota, e o `body` da requisição deve ter o seguinte formato:

```json
{
    "name": "Autor1",
    "nationality": "Americano"
}
```
Exemplo de retorno com sucesso:
```json
  { "message": "Author updated succesful" }
```
Quando o `id` do autor não é encontrado:
```json
  { "message": "Error - Error on update author"}
```

#### Regras:
- Atributos `name` e `nationality` não podem estar vazios;
---
###  DELETE `/authors/:id`
Rota responsável por remover um autor da tabela `authors` com base no `id` passado na requisição.

Exemplo de retorno com sucesso:
```json
  { "message": "Author deleted succesful" }
```
Quando o `id` do produto a ser deletado não é encontrado:
```json
  { "message": "Error - Error on delete Author"}
```
---
