import express from 'express';
import { obtenerUsuarios, adminCheck, crearUsuario, login, autenticar, obtenerUsuario, actualizarUsuario } from './api/users/users.js';
import { crearRecomendaciones ,obtenerRecomendaciones, obtenerRecomendacionesLugar } from './api/recomendacion/recomendacion.js';
import { instanciaSingleton } from './prisma/prisma.js';
import dotenv from 'dotenv';
import { obtenerLugares, crearLugar, obtenerLugaridLugar } from './api/lugar/lugar.js';
import { obtenerhoteles, crearHotel, borrarHotel, obtenerhotelesid, obtenerhotelespais, modificarHotel } from './api/hotel/hotel.js';
import { obtenerMarcadores, crearMarcador, obtenerMarcadoresidUser, borrarMarcador, isMarcador } from './api/marcador/marcador.js';
import { crearPais, obtenerPaises, borrarPais } from './api/pais/pais.js';
import {obtenerReservas ,obtenerReservasPorUsuario, crearReserva} from './api/reserva/reserva.js'

dotenv.config();

const prisma = instanciaSingleton;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//usuarios
app.get('/usuario',autenticar, obtenerUsuarios);
app.put('/usuario', actualizarUsuario);
app.post('/usuario', crearUsuario);
app.get('/usuario/:idUsuario', obtenerUsuario);
app.post('/usuario/admin', adminCheck);

//recomendaciones
app.get('/recomendacion', obtenerRecomendaciones);
app.post('/lugarrecomendacion', obtenerRecomendacionesLugar);
//app.post('/recomendacion', crearRecomendacion);

//lugares
app.get('/lugar', obtenerLugares);
app.get('/lugar/:idLugar', obtenerLugaridLugar);
app.post('/lugar', crearLugar);

//reservas
app.get('/reserva', obtenerReservas);
app.get('/reserva/:idUsuario', obtenerReservasPorUsuario);
app.post('/reserva', crearReserva);

//paises
app.get('/pais', obtenerPaises);
app.post('/pais', crearPais);
app.delete('/pais', borrarPais);

//login
app.post('/login', login); // Agregar la ruta para el inicio de sesión

//hoteles
app.get('/hotel', obtenerhoteles);
app.post('/hotel', crearHotel);
app.put('/hotel', modificarHotel);
app.delete('/hotel', borrarHotel);
app.get('/hotel/:idHotel', obtenerhotelesid);
app.get('/hotelpais/:nombrePais', obtenerhotelespais);

//marcadores
app.get('/marcador', obtenerMarcadores);
app.get('/marcadoris', isMarcador);
app.get('/marcador/:idUsuario', obtenerMarcadoresidUser);
app.post('/marcador', crearMarcador);
app.delete('/marcador', borrarMarcador);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
