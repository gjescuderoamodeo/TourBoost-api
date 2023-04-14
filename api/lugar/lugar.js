import { instanciaSingleton } from "../../prisma/prisma.js";
//const { PrismaClient } = require('@prisma/client');

//const prisma = new PrismaClient();
const prisma = instanciaSingleton;

// Obtener todos los lugares
async function obtenerLugares(req, res) {
  try {
    const lugares = await prisma.lugar.findMany();
    res.json(lugares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los lugares" });
  }
}

export { obtenerLugares };