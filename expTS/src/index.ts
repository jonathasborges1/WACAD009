import express from "express";
import dotenv from "dotenv";
import validateEnv  from "./utils/validateEnv";
import accessLogger from './loggerPlus';
import logger = require("morgan");
import { engine } from "express-handlebars";

import router from "./router/router";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

const publicPath = `${process.cwd()}/public`;

app.use(logger("short"));
app.use(accessLogger);

// Exemplo de uso de middleware para tratar rotas
app.use(router);

// Exemplo de uso de middleware para tratar arquivos estáticos css | js | img
app.use(express.static('public'));

app.use('/css', express.static(`${publicPath}/css`));
app.use('/js', [
   express.static(`${__dirname}/public/js`),
   express.static(`${__dirname}/../node_modules/bootstrap/dist/js/`)
]);
app.use('/webfonts', express.static(`${publicPath}/../node_modules/@fortawesome/fontawesome-free/webfonts`));
app.use('/img', express.static(`${publicPath}/img`));


// Exemplo de uso de middleware para tratar views
// app.engine("handlebars", engine());
app.engine("handlebars", engine({
   helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));
  
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

import sass from 'node-sass-middleware';
// console.log("__dirname -> ", __dirname);
console.log("publicPath -> ", publicPath);

app.use(sass({
   src: `${publicPath}/scss`,
   dest: `${publicPath}/css`,
   outputStyle: 'compressed',
   prefix: '/css'
}));

app.use('/css', express.static(`${publicPath}/css`));

// Exemplo de rota com expressão regular
app.get( /^\/(api|rest)\/.+$/, (req, res) => {
   res.send("Envio de dados da API!");
});

// // exemplo de rotas com parâmetros
// app.get("/api/:id/:nome", (req, res) => {
//    res.send(`Recebi o id ${req.params.id} e o nome ${req.params.nome}`);
// })

// app.get("/", (req: Request, res: Response) => {
//    res.send("Hello Word!");
// });

app.listen(PORT, () => {
   console.log(`Express app inicia na porta ${PORT}`);
});
