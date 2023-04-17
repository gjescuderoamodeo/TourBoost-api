//import { instanciaSingleton } from "../../prisma/prisma.js";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
//const prisma = instanciaSingleton;

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
  

export { obtenerReservas, obtenerReservasPorUsuario };