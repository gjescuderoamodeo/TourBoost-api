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

// Obtener lugar por id
async function obtenerLugaridLugar(req, res) {
  const { idLugar } = req.params;

  try {
    const lugar = await prisma.lugar.findUnique({
      where: {
        idLugar: parseInt(idLugar)
      }
    });
    res.json(lugar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los lugares con ese id", errorMessage: error.message });
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

//
async function borrarLugar(req, res) {
  const { idLugar} = req.body;

  try {
    const Lugardelete = await prisma.lugar.deleteMany({
        where: {
          idLugar:idLugar,
        }
      });

      res.json({ message: `El lugar ha sido eliminado correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo borrar el lugar", errorMessage: error.message });
  }
}

// modificar un lugar
async function modificarLugar(req, res) {
  const { latitud, longitud, tipo_lugar, nombre, nombrePais, idLugar } = req.body;

  try {
    const nuevoLugar = await prisma.lugar.update({
        where:{
          idLugar:idLugar
        },
        data: {
          latitud,
          longitud,
          tipo_lugar,
          nombre,
          nombrePais,
        }
      });
    res.json(nuevoLugar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo modificar el Lugar" });
  }
}


export { obtenerLugares, crearLugar, obtenerLugaridLugar, borrarLugar, modificarLugar };