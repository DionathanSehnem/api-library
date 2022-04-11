import express from "express";
import cors from "cors";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, 'Erro de conexão do banco de dados'));
db.once("open", () => {
    console.log("A conexão com o banco foi feita com sucesso");
})

const app = express();

app.use(express.json());
app.use(cors());

routes(app);

export default app;