import { instanciaSingleton } from "../../prisma/prisma.js";
//const { PrismaClient } = require('@prisma/client');

//const prisma = new PrismaClient();
const prisma = instanciaSingleton;

// Obtener todos las paises
async function obtenerPaises(req, res) {
  try {
    const paises = await prisma.pais.findMany();
    res.json(paises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los paises" });
  }
}

//borrar un pais
async function borrarPais(req, res) {
  const { nombre } = req.body;

  try {
    const pais = await prisma.pais.deleteMany({
      where: {
        nombre: nombre,
      },
    });
    res.json({ message: `El pais con nombre ${nombre} ha sido eliminado correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `No se pudo eliminar el pais con nombre ${nombre}` });
  }
}

// Crear un nuevo pais
async function crearPais(req, res) {
  const { codigo_pais, nombre} = req.body;

  try {
    const nuevoPais = await prisma.pais.create({
        data: {
          nombre,
          codigo_pais
        }
      });
    res.json(nuevoPais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear Pais" });
  }
}

export { crearPais, obtenerPaises };