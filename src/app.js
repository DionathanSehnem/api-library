import express from "express";
import cors from "cors";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

db.on("error", console.log.bind(console, 'Erro de conexão do banco de dados'));
db.once("open", () => {
    console.log("A conexão com o banco foi feita com sucesso");
})

const app = express();

app
    .use(express.json())
    .use(cors())
    .use(express.static('../public'))
    .use('/css', express.static(path.resolve('public/css')))
    .use('/js', express.static(path.resolve('public/js')))
    .use('/assets', express.static(path.resolve('public/assets')))


routes(app);

export default app;