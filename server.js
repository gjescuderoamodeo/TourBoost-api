import express from 'express';
import { obtenerUsuarios, borrarUsuario, adminCheck, crearUsuario, login, autenticar, obtenerUsuario, actualizarUsuario } from './api/users/users.js';
import { crearRecomendaciones ,obtenerRecomendaciones, obtenerRecomendacionesLugar, borrarRecomendacion, modificarRecomendacion } from './api/recomendacion/recomendacion.js';
import { instanciaSingleton } from './prisma/prisma.js';
import dotenv from 'dotenv';
import { obtenerLugares, crearLugar, obtenerLugaridLugar, borrarLugar, modificarLugar } from './api/lugar/lugar.js';
import { obtenerhoteles, crearHotel, borrarHotel, obtenerhotelesid, obtenerhotelespais, modificarHotel } from './api/hotel/hotel.js';
import { obtenerMarcadores, crearMarcador, obtenerMarcadoresidUser, borrarMarcador, isMarcador } from './api/marcador/marcador.js';
import { crearPais, obtenerPaises, borrarPais, modificarPais } from './api/pais/pais.js';
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
app.delete('/usuario', borrarUsuario);
app.get('/usuario/:idUsuario', obtenerUsuario);
app.post('/usuario/admin', adminCheck);

//recomendaciones
app.get('/recomendacion', obtenerRecomendaciones);
app.post('/lugarrecomendacion', obtenerRecomendacionesLugar);
app.post('/recomendacion', crearRecomendaciones);
app.put('/recomendacion', modificarRecomendacion);
app.delete('/recomendacion', borrarRecomendacion);

//lugares
app.get('/lugar', obtenerLugares);
app.get('/lugar/:idLugar', obtenerLugaridLugar);
app.post('/lugar', crearLugar);
app.delete('/lugar', borrarLugar);
app.put('/lugar', modificarLugar);

//reservas
app.get('/reserva', obtenerReservas);
app.get('/reserva/:idUsuario', obtenerReservasPorUsuario);
app.post('/reserva', crearReserva);

//paises
app.get('/pais', obtenerPaises);
app.post('/pais', crearPais);
app.put('/pais', modificarPais);
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
app.post('/marcadoris', isMarcador);
app.get('/marcador/:idUsuario', obtenerMarcadoresidUser);
app.post('/marcador', crearMarcador);
app.delete('/marcador', borrarMarcador);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
