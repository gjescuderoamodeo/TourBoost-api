import { instanciaSingleton } from "../../prisma/prisma.js";
//const { PrismaClient } = require('@prisma/client');

//const prisma = new PrismaClient();
const prisma = instanciaSingleton;

// Obtener todos las recomendaciones
async function obtenerRecomendaciones(req, res) {
  try {
    const recomendaciones = await prisma.recomendacion.findMany();
    res.json(recomendaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los recomendaciones" });
  }
}

//obtener recomendacion por id lugar
async function obtenerRecomendacionesLugar(req, res) {
  const { nombre } = req.body;

  try {
    const lugar = await prisma.lugar.findUnique({
      where: {
        nombre: nombre
      }
    });

    if (lugar) {
      const recomendaciones = await prisma.recomendacion.findMany({
        where: {
          idLugar: lugar.idLugar
        }
      });

      res.json(recomendaciones);
    } else {
      res.status(404).json({ error: "Lugar no encontrado" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo obtener las recomendaciones" });
  }
}




// Crear un nuevo Recomendaciones
async function crearRecomendaciones(req, res) {
  const { nombre, imagen, descripcion, idLugar } = req.body;

  try {

    const nuevoRecomendaciones = await prisma.recomendacion.create({
        data: {
          nombre,
          imagen,
          descripcion,
          idLugar
        }
      });
    res.json(nuevoRecomendaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear Recomendacion" });
  }
}

// modificar un hotel
async function modificarRecomendacion(req, res) {
  const { nombre, imagen, descripcion, idLugar, idRecomendacion } = req.body;

  try {
    const nuevoRecomendacion = await prisma.recomendacion.update({
        where:{
          idRecomendacion:idRecomendacion
        },
        data: {
          nombre,
          imagen,
          descripcion,
          idLugar,
        }
      });
    res.json(nuevoRecomendacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo modificar el Hotel" });
  }
}

//
async function borrarRecomendacion(req, res) {
  const { idRecomendacion } = req.body;

  try {
    const recomendacionDelete = await prisma.recomendacion.deleteMany({
        where: {
          idRecomendacion:idRecomendacion,
        }
      });

      res.json({ message: `La recomendacion ha sido eliminado correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo borrar la recomendacion", errorMessage: error.message });
  }
}

export { obtenerRecomendaciones, crearRecomendaciones, obtenerRecomendacionesLugar, modificarRecomendacion, borrarRecomendacion };