import express, {Request,Response} from "express";
import dotenv from "dotenv";
import validateEnv  from "./utils/validateEnv";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.get("/", (req: Request, res: Response) => {
   res.send("Hello Word!");
});

app.listen(PORT, () => {
   console.log(`Express app inicia na porta ${PORT}`);
});
