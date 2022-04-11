import books from "../models/Book.js";

let number = 0;

class BookController {
    static getAllBooks = (req, res) => {
        console.log(number);
        number++;
        books.find()
            .populate('author')
            .exec((err, books) => {
                res.status(200).json(books);
            });
    }

    static getBookById = (req, res) => {
        const id = req.params.id;
        books.findById(id)
            .populate('author', 'name')
            .exec((err, books) => {
                if (err) {
                    res.status(400).send({ message: `${err.message} - Id do livro não localizado` });
                } else {
                    res.status(200).send(books);
                }
            })
    }

    static getBookByPublishing = (req, res) => {
        const publishing = req.query.publishing;

        //res.send({message: `publishing: ${typeof publishing}`});
        books.find({ 'publishing': publishing }, {}, (err, books) => {
            if (err) {
                res.send({ message: `${err.message} - A editora não foi encontrada` })
            } else {
                res.status(200).send(books);
            }
        })
    }

    static registerBook = (req, res) => {
        let book = new books(req.body);
        console.log(book);

        book.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} -  Falha ao cadastrar livro` })
            } else {
                res.status(201).send(book.toJSON())
            }
        });
    }

    static updateBook = (req, res) => {
        const id = req.params.id;
        console.log(req.params);
        books.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Livro atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `${err.message} - Erro ao atualizar o livro` })
            }
        })
    }

    static deleteBook = (req, res) => {
        const id = req.params.id;
        books.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: "Livro foi excluido com sucesso" });
            } else {
                res.status(500).send({ message: `${err.message} - Erro ao deletar o livro` });
            }
        })
    }

}

export default BookController;