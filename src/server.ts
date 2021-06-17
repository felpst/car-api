import express from 'express';
import swaggerUI from 'swagger-ui-express'; // Swagger é um library externa que eu instalei (junto com @types) que testa o projeto e já cria uma API documentation.
import swaggerFile from "./swagger.json"; // File que conterá a documentation.

import { router } from './routes'

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile)); // A documentação vai ficar na URL /api-docs. O setup() necessita de um arquivo JSON para armazenar todas as informações sobre a documentação.

app.use(router); // Aqui eu estou usando o index.ts das Routes para importar e usar todas de uma só vez.

app.listen(3333, () => console.log("Server is running"))

// Estou usando uma bibliotéca chamada de multer para poder possibilitar o upload de arquivos para este projeto.
// Para usar uma bibliotéca é necessário primeiro instalar ela (yarn add 'Nome da Blib."), e então instalar os types dela (yarn add @types/'Nome da Blib.' -D), o -D possibilita a instalação somente em modo de desenvolvedor.