//import { instanciaSingleton } from "../../prisma/prisma.js";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
//const prisma = instanciaSingleton;

// Obtener todos los lugares
async function obtenerLugares(req, res) {
  try {
    const lugares = await prisma.lugar.findMany({
      select: {
        idLugar: true,
        latitud: true,
        longitud: true,
        tipo_lugar: true,
        nombre: true,
        nombrePais: true,
      },
    });

    res.json(lugares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los lugares" });
  }
}

// Crear un nuevo lugar
async function crearLugar(req, res) {
  const { latitud, longitud, tipo_lugar, nombre, nombrePais } = req.body;

  try {
    const nuevoLugar = await prisma.lugar.create({
      data: {
        latitud,
        longitud,
        tipo_lugar,
        nombre,
        nombrePais
      }
    });
    res.json(nuevoLugar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export { obtenerLugares, crearLugar };