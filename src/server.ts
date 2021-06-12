import express from 'express';
import { categoriesRoutes } from './routes/categories.routes'; // Como ela nao é export default, é preciso colocar ela dentro de {}

const app = express();

app.use(express.json());

app.use(categoriesRoutes)

app.listen(3333, () => console.log("Server is running"))