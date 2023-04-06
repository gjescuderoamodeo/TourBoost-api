import express from 'express';
import { obtenerUsuarios, crearUsuario } from './api/users.js';
//import { crearRecomendacion } from './api/recomendaciones.js';
import { instanciaSingleton } from './prisma/prisma.js';
import dotenv from 'dotenv';

dotenv.config();

const prisma = instanciaSingleton;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/usuario', obtenerUsuarios);
app.post('/usuario', crearUsuario);
//app.post('/recomendacion', crearRecomendacion);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
