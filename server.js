import express from 'express';
import { obtenerUsuarios, adminCheck, crearUsuario, login, autenticar } from './api/users/users.js';
import { crearRecomendaciones ,obtenerRecomendaciones, obtenerRecomendacionesLugar } from './api/recomendacion/recomendacion.js';
import { instanciaSingleton } from './prisma/prisma.js';
import dotenv from 'dotenv';
import { obtenerLugares } from './api/lugar/lugar.js';
import {obtenerReservas ,obtenerReservasPorUsuario} from './api/reserva/reserva.js'

dotenv.config();

const prisma = instanciaSingleton;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//usuarios
app.get('/usuario',autenticar, obtenerUsuarios);
app.post('/usuario', crearUsuario);
app.post('/usuario/admin', adminCheck);

//recomendaciones
app.get('/recomendacion', obtenerRecomendaciones);
//app.post('/recomendacion', crearRecomendacion);

//lugares
app.get('/lugar', obtenerLugares);
app.get('/lugaresrecomendacion/:idLugar', obtenerRecomendacionesLugar);

//reservas
app.get('/reserva', obtenerReservas);
app.get('/reserva/:idUsuario', obtenerReservasPorUsuario);


//login
app.post('/login', login); // Agregar la ruta para el inicio de sesión

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
