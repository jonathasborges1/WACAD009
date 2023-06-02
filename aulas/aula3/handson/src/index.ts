import express, {Request,Response} from "express";
import dotenv from "dotenv";
import validateEnv  from "./utils/validateEnv";
// import accessLogger from './loggerPlus';
import logger = require("morgan");

import { engine } from "express-handlebars";

import router from "./router/router";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

const publicPath = `${process.cwd()}/public`;

app.use(logger("short"));
// app.use(accessLogger);

// Exemplo de uso de middleware para tratar rotas
app.use(router);

// Exemplo de uso de middleware para tratar arquivos estáticos css | js | img
app.use('/css', express.static(`${publicPath}/css`));
app.use('/css', express.static(`${publicPath}/js`));
app.use('/css', express.static(`${publicPath}/img`));

// Exemplo de uso de middleware para tratar views
// app.engine("handlebars", engine());
app.engine("handlebars", engine({
   helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));
  
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.get("/hb1", (req, res) => {
   res.render("hb1", { 
      mensagem: "Olá, você está aprendendo Express + HBS!",
      layout: false,
   });
});

app.get("/hb2", (req, res) => {
   res.render("hb2", { 
      poweredByNodejs: true,
      name: 'Express',
      type: 'Framework',
      layout: false,     
   });
});

app.get("/hb3", (req, res) => {
   const profes = [
      { nome: 'David Fernandes', sala: 1238 },
      { nome: 'Horácio Fernandes', sala: 1233 },
      { nome: 'Edleno Moura', sala: 1236 },
      { nome: 'Elaine Harada', sala: 1231 }
   ];

   res.render('hb3', { profes, layout: false });     
});

app.get("/hb4", (req, res) => {
   const profes = [
      { nome: 'David Fernandes', sala: 1238 },
      { nome: 'Horácio Fernandes', sala: 1233 },
      { nome: 'Edleno Moura', sala: 1236 },
      { nome: 'Elaine Harada', sala: 1231 },
      { nome: 'Jonathas Cavalcante', sala: 1231 }
   ];

   res.render('hb4', { profes, layout: false });     
});

// Exemplo de rota com expressão regular
app.get( /^\/(api|rest)\/.+$/, (req, res) => {
   res.send("Envio de dados da API!");
});

// exemplo de rotas com parâmetros
app.get("/api/:id/:nome", (req, res) => {
   res.send(`Recebi o id ${req.params.id} e o nome ${req.params.nome}`);
})

app.get("/", (req: Request, res: Response) => {
   res.send("Hello Word!");
});

app.listen(PORT, () => {
   console.log(`Express app inicia na porta ${PORT}`);
});
