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
  const { nombre, apellidos, password, correo, admin } = req.body;

  try {

    const nuevoRecomendaciones = await prisma.recomendacion.create({
        data: {
          imagen,
          descripcion,
          correo,
          admin
        }
      });
    res.json(nuevoRecomendaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear Recomendaciones" });
  }
}

export { obtenerRecomendaciones, crearRecomendaciones, obtenerRecomendacionesLugar };