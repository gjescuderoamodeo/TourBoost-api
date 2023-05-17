import { instanciaSingleton } from "../../prisma/prisma.js";
//const { PrismaClient } = require('@prisma/client');

//const prisma = new PrismaClient();
const prisma = instanciaSingleton;

// Obtener todos las reservas
async function obtenerReservas(req, res) {
  try {
    const reservas = await prisma.reserva.findMany();
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los reservas" });
  }
}

// Crear un nuevo pais
async function crearReserva(req, res) {
  const { fecha_inicio, fecha_fin, idUsuario, idHotel, numeroReservantes } = req.body;

  try {
    const nuevaReserva = await prisma.reserva.create({
        data: {
          fecha_inicio,
          fecha_fin,
          idUsuario,
          idHotel
        }
      });

    const quitarplazasDisponibles = await prisma.hotel.update({
      where: {
        idHotel: idHotel
      },
      data: {
        plazasDisponibles: {
          decrement: numeroReservantes
        }
      }
    });        

    res.json(nuevaReserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear Reserva" });
  }
}


//obtener reservas de un usuario
async function obtenerReservasPorUsuario(req, res) {
    try {
      const { idUsuario } = req.params;
      const reservas = await prisma.reserva.findMany({
        where: {
          idUsuario: parseInt(idUsuario), 
        },
      });
      res.json(reservas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudieron obtener las reservas" });
    }
  }
  

export { obtenerReservas, obtenerReservasPorUsuario, crearReserva };