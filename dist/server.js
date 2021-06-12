"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // Os... da biblioteca indica que as funções principais não estão nela, e que para usa-las é necessário baixar uma outra bibliotéca. Neste caso é necessário instalar o @types/express, faça isso usando o yarn
var app = express_1.default();
app.get("/", function (req, res) {
    return res.json({ message: "Hello World!" });
});
app.listen(3333);
/* Para rodar este cógido é necessário converte-lo para JS para que o node possa entender. Eu posso fazer isso seguindo:
- yarn add typescript -D
- yarn tsc --init
- yarn tsc <-- Isso irá converter o .ts em .js
Eu configurei o outdir no tsconfig, para os arquivos js criados serem enviados para uma pasta fora da pasta atual.
*/ 
