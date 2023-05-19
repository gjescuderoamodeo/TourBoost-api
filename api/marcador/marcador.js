import { instanciaSingleton } from "../../prisma/prisma.js";
//const { PrismaClient } = require('@prisma/client');

//const prisma = new PrismaClient();
const prisma = instanciaSingleton;

// Obtener todos las marcadores
async function obtenerMarcadores(req, res) {
  try {
    const marcadores = await prisma.marcador.findMany();
    res.json(marcadores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los marcadores" });
  }
}

// Obtener todos las marcadores por id usuario
async function obtenerMarcadoresidUser(req, res) {
  const { idUsuario } = req.params;

  try {
    const marcadoresUser = await prisma.marcador.findMany({
        where: {
            idUsuario:parseInt(idUsuario)
        }
      });
    res.json(marcadoresUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los marcadores", errorMessage: error.message });
  }
}
  
// Crear un nuevo marcador
async function crearMarcador(req, res) {
  const { idUsuario, idLugar} = req.body;

  try {
    const nuevoMarcador = await prisma.marcador.create({
        data: {
            idUsuario,
            idLugar
        }
      });
    res.json(nuevoMarcador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear Marcador" });
  }
}

export { obtenerMarcadores, crearMarcador, obtenerMarcadoresidUser };