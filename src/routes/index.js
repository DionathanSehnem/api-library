import express from "express";
import books from "./booksRoutes.js";
import authors from "./authorsRoutes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);


let routes = (app) => {
    app.route('/').get((req, res) => {
        res.sendFile(path.resolve('view/index.html'))
            // res.status(200).send({ title: "Curso de node" })
    })

    app.use(
        express.json(),
        books,
        authors
    )
}

export default routes;