// Arquivo src/controllers/main.ts
import fs from "fs";
import path from "path";
import { LoremIpsum } from "lorem-ipsum";
import { Request, Response } from 'express';


const index = (req: Request, res: Response) => {
 res.end('Welcome to Web academy!');
};

// exemplo de rotas com parâmetros
const bemvindo  = (req: Request, res: Response) => {
   res.send(`Recebi o id ${req.params.id} e o nome ${req.params.nome}`);
};

interface BodyContent {
   html: string;
   css: string;
   js: string;
}

const getBody = (): BodyContent | undefined => {
   try {
      const publicPath = path.resolve(__dirname, '../../public');

      const htmlFilePath = path.join(publicPath, 'index.html');
      const fileContentHTML = fs.readFileSync(htmlFilePath, 'utf8');

      const cssFilePath = path.join(publicPath, 'style.css');
      const fileContentCSS = fs.readFileSync(cssFilePath, 'utf8');

      const jsFilePath = path.join(publicPath, 'script.js');
      const fileContentJS = fs.readFileSync(jsFilePath, 'utf8');

      return {
         html: fileContentHTML,
         css: fileContentCSS,
         js: fileContentJS,
      };
   } catch (error) {
      console.error(error);
      return undefined;
   }
};

const initialResponse = (req: Request, res: Response) => {
   const bodyContent = getBody();

   if (!bodyContent) {
      res.status(500).send('Internal Server Error');
      return;
   }

   res.send(`${bodyContent.html}<style>${bodyContent.css}</style><script>${bodyContent.js}</script>`);
};

const lorem = (req: Request, res: Response) => {

   const numParagraphs = parseInt(req?.query?.numParagraphs as string);

   if (isNaN(numParagraphs) || numParagraphs < 1 || numParagraphs > 10) {
     res.status(400).send('Number of paragraphs must be between 1 and 10.');
     return;
   }

   if (numParagraphs) {

      const lorem = new LoremIpsum();
      const loremTexts = lorem.generateParagraphs(numParagraphs);
      const paragraphs = loremTexts.split('\n'); // Dividir o texto em parágrafos usando o caractere de quebra de linha

      res.json(paragraphs);
   } else {

      initialResponse(req, res);
   }
};

const hb1 = (req: Request, res: Response) => {
   res.render("hb1", { 
      mensagem: "Olá, você está aprendendo Express + HBS!",
      layout: false,
   });
};

const hb2 = (req: Request, res: Response) => {
   res.render('main/hb2', {
   nome: 'React',
   tipo: 'library',
   poweredByNode: true,
   layout: false,
   });
};

const hb3 = (req: Request, res: Response) => {
   const profes = [
      { nome: 'David Fernandes', sala: 1238 },
      { nome: 'Horácio Fernandes', sala: 1233 },
      { nome: 'Edleno Moura', sala: 1236 },
      { nome: 'Elaine Harada', sala: 1231 }
   ];

   res.render('hb3', { profes, layout: false });     
};

const hb4 = (req: Request, res: Response) => {
   const profes = [
      { nome: 'David Fernandes', sala: 1238 },
      { nome: 'Horácio Fernandes', sala: 1233 },
      { nome: 'Edleno Moura', sala: 1236 },
      { nome: 'Elaine Harada', sala: 1231 },
      { nome: 'Jonathas Cavalcante', sala: 1231 }
   ];

   res.render('hb4', { profes, layout: false });     
};

export default { index, bemvindo, lorem ,hb1, hb2, hb3, hb4 };