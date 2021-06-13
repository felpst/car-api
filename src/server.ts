import express from 'express';
import { categoriesRoutes } from './routes/categories.routes'; // Como ela nao é export default, é preciso colocar ela dentro de {}

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes) // Toda a rota que vier do categoriesRoutes, ela será iniciada com o /categories, portanto eu não preciso mais ficar incluindo isso nos documentos de rotas.

app.listen(3333, () => console.log("Server is running"))