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