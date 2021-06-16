import express from 'express';

import { router } from './routes'

const app = express();

app.use(express.json());

app.use(router); // Aqui eu estou usando o index.ts das Routes para importar e usar todas de uma só vez.

app.listen(3333, () => console.log("Server is running"))

// Estou usando uma bibliotéca chamada de multer para poder possibilitar o upload de arquivos para este projeto.
// Para usar uma bibliotéca é necessário primeiro instalar ela (yarn add 'Nome da Blib."), e então instalar os types dela (yarn add @types/'Nome da Blib.' -D), o -D possibilita a instalação somente em modo de desenvolvedor.