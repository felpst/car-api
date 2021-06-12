import express from 'express'; // Os... da biblioteca indica que as funções principais não estão nela, e que para usa-las é necessário baixar uma outra bibliotéca. Neste caso é necessário instalar o @types/express, faça isso usando o yarn

const app = express();

app.get("/", (req, res) => {
    return res.json({message: "Hello World!"});
})

app.listen(3333)
/* Para rodar este cógido é necessário converte-lo para JS para que o node possa entender. Eu posso fazer isso seguindo:
- yarn add typescript -D
- yarn tsc --init
- yarn tsc <-- Isso irá converter o .ts em .js
Eu configurei o outdir no tsconfig, para os arquivos js criados serem enviados para uma pasta fora da pasta atual.
*/