import authors from "../models/Author.js";

class AuthorController {

    static getAllAuthors = (req, res) => {
        authors.find((err, authors) => {
            res.status(200).json(authors);
        });
    }

    static getAuthorById = (req, res) => {
        const id = req.params.id;
        authors.findById(id, (err, authors) => {
            if (!err) {
                res.status(200).send(authors);
            } else {
                res.status(400).send({ message: `${err.message} - Id do autor não localizado` });
            }
        })
    }

    static getAuthorByName = (req, res) => {
        const name = req.query.name;

        console.log(name);
        authors.find({ 'name': name }, {}, (err, authors) => {
            if (err) {
                res.send({ message: `${err.message} - o autor não foi encontrado` })
            } else {
                console.log(authors);
                res.status(200).send(authors);
            }
        })
    }

    static registerAuthor = (req, res) => {
        let author = new authors(req.body);

        author.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} -  Falha ao cadastrar autor` })
            } else {
                res.status(201).send(author.toJSON())
            }
        });
    }

    static updateAuthor = (req, res) => {
        const id = req.params.id;
        authors.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'autor atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `${err.message} - Erro ao atualizar o autor` })
            }
        })
    }

    static deleteAuthor = (req, res) => {
        const id = req.params.id;
        authors.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: "autor foi excluido com sucesso" });
            } else {
                res.status(500).send({ message: `${err.message} - Erro ao deletar o autor` });
            }
        })
    }

}

export default AuthorController;