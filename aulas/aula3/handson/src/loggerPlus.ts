// Implement a middleware to save the access data of users in a log file, within a folder entered in the file .env. The middleware will receive a parameter indicating one of the following log formats

import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

type logFormatPlus = "simples" | "completo";

// Middleware para salvar dados de acesso em um arquivo de log
function accessLogger(req: Request, res: Response, next: NextFunction) {
  console.log("req.query -> ",req.query);
  if(Object.keys(req.query).length === 0){next();return null;}

  // Obtenha o formato de log a partir do parâmetro
  const logFormat = req.query.logFormat as logFormatPlus; // Supondo que o parâmetro seja passado como uma query string na URL
  console.log("logFormat -> ",logFormat);

  // Verifique se o formato de log é válido
  if (logFormat !== 'simples' && logFormat !== 'completo') {
    return res.status(400).json({ error: 'Formato de log inválido.' });
  }

  // Crie o objeto de dados de acesso
  const accessData = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl,
  };

  // Obtenha o caminho para a pasta de log a partir do arquivo .env
  const logFolderPath = process.env.LOG_FOLDER_PATH ?? "null";
  console.log("logFolderPath -> ",logFolderPath);

  // Crie o nome do arquivo de log com base na data atual
  const logFileName = `${new Date().toISOString().split('T')[0]}.log`;
  console.log("logFileName -> ",logFileName);

  // Crie o caminho completo para o arquivo de log
  const logFilePath = path.join(logFolderPath, logFileName);
  console.log("logFilePath -> ",logFilePath);

  // Formate os dados de acesso com base no formato de log escolhido
  let logEntry: string;
  if (logFormat === 'completo') {
    logEntry = JSON.stringify(`${accessData.timestamp},${accessData.ip},${accessData.url},${req.httpVersion},${req.get("User-Agent")}`) + `\n`;
  } else {
    logEntry = JSON.stringify(accessData) + '\n';
  }

  // Salve os dados de acesso no arquivo de log
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Erro ao salvar o registro de acesso:', err);
    }
  });

  // Continue para a próxima rota ou middleware
  next();
}

export default accessLogger;
