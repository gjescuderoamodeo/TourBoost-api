import express from 'express';
import { obtenerUsuarios, crearUsuario, login, autenticar } from './api/users/users.js';
import { crearRecomendaciones ,obtenerRecomendaciones, obtenerRecomendacionesLugar } from './api/recomendacion/recomendacion.js';
import { instanciaSingleton } from './prisma/prisma.js';
import dotenv from 'dotenv';
import { obtenerLugares } from './api/lugar/lugar.js';

dotenv.config();

const prisma = instanciaSingleton;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/usuario',autenticar, obtenerUsuarios);
app.post('/usuario', crearUsuario);
app.get('/recomendacion', obtenerRecomendaciones);
app.get('/lugaresrecomendacion/:idLugar', obtenerRecomendacionesLugar);
//app.post('/recomendacion', crearRecomendacion);

//lugares
app.get('/lugar', obtenerLugares);

//login
app.post('/login', login); // Agregar la ruta para el inicio de sesión

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
