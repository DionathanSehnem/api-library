import express from "express";
import AuthorController from "../controllers/authorsController.js";

const router = express.Router();

router
    .get("/authors", AuthorController.getAllAuthors)
    .get("/authors/search", AuthorController.getAuthorByName)
    .get("/authors/:id", AuthorController.getAuthorById)
    .post("/authors", AuthorController.registerAuthor)
    .put("/authors/:id", AuthorController.updateAuthor)
    .delete("/authors/:id", AuthorController.deleteAuthor)

export default router;