import express from 'express';
import { obtenerUsuarios, adminCheck, crearUsuario, login, autenticar } from './api/users/users.js';
import { crearRecomendaciones ,obtenerRecomendaciones, obtenerRecomendacionesLugar } from './api/recomendacion/recomendacion.js';
import { instanciaSingleton } from './prisma/prisma.js';
import dotenv from 'dotenv';
import { obtenerLugares, crearLugar } from './api/lugar/lugar.js';
import { obtenerhoteles, crearHotel } from './api/hotel/hotel.js';
import { obtenerMarcadores, crearMarcador } from './api/marcador/marcador.js';
import { crearPais } from './api/pais/pais.js';
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
app.post('/lugar', crearLugar);

//reservas
app.get('/reserva', obtenerReservas);
app.get('/reserva/:idUsuario', obtenerReservasPorUsuario);

//paises
app.post('/pais', crearPais);


//login
app.post('/login', login); // Agregar la ruta para el inicio de sesión

//hoteles
app.get('/hotel', obtenerhoteles);
app.post('/hotel', crearHotel);

//marcadores
app.get('/marcador', obtenerMarcadores);
app.post('/marcador', crearMarcador);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
