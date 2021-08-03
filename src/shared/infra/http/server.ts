import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import swaggerUI from 'swagger-ui-express'; // Swagger é um library externa que eu instalei (junto com @types) que testa o projeto e já cria uma API documentation.

import "@shared/infra/typeorm"; // Since I am importing the index from the database folder, I don't need to explicitly pass it, because it automatically recognizes it.

import "@shared/container"; // I am importing the container index that I have used to create a category. Why did i have import it here?
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json"; // File que conterá a documentation.
import { router } from './routes';


const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile)); // A documentação vai ficar na URL /api-docs. O setup() necessita de um arquivo JSON para armazenar todas as informações sobre a documentação.

app.use(router); // Aqui eu estou usando o index.ts das Routes para importar e usar todas de uma só vez.

app.use((err: Error, request: Request, response: Response, next: NextFunction) => { // I am creating a middleware here to deal with errors. For middlewares that deal with errors, the first argument must always be the error.
    if(err instanceof AppError) // Here i am getting the instance of the error
    {
        return response.status(err.statusCode).json({
            message: err.message,
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
})

app.listen(3333, () => console.log("Server is running"));

// Estou usando uma bibliotéca chamada de multer para poder possibilitar o upload de arquivos para este projeto.
// Para usar uma bibliotéca é necessário primeiro instalar ela (yarn add 'Nome da Blib."), e então instalar os types dela (yarn add @types/'Nome da Blib.' -D), o -D possibilita a instalação somente em modo de desenvolvedor.