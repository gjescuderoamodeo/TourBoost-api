import { instanciaSingleton } from "../../prisma/prisma.js";
//const { PrismaClient } = require('@prisma/client');

//const prisma = new PrismaClient();
const prisma = instanciaSingleton;

// Obtener todos las hoteles
async function obtenerhoteles(req, res) {
  try {
    const hoteles = await prisma.hotel.findMany();
    res.json(hoteles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los hoteles" });
  }
}
  
// Crear un nuevo hotel
async function crearHotel(req, res) {
  const { nombre, direccion, plazasDisponibles, plazasTotales, telefono_contacto,idLugar } = req.body;

  try {
    const nuevoHotel = await prisma.hotel.create({
        data: {
          nombre,
          direccion,
          plazasDisponibles,
          plazasTotales,
          telefono_contacto,
          idLugar
        }
      });
    res.json(nuevoHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear Hotel" });
  }
}

export { obtenerhoteles, crearHotel };