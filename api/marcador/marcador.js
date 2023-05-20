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

// Obtener todos las marcadores por id usuario
async function borrarMarcador(req, res) {
  const { idLugar, idUsuario } = req.body;

  try {
    const marcadoresUserdelete = await prisma.marcador.deleteMany({
        where: {
          idLugar:idLugar,
          idUsuario:idUsuario,
        }
      });

      res.json({ message: `El marcador ha sido eliminado correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo borrar el marcador", errorMessage: error.message });
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

// Devolver si marcador en favoritos marcador
async function isMarcador(req, res) {
  const { idUsuario, idLugar} = req.body;

  try {
    const nuevoMarcador = await prisma.marcador.findMany({
        where: {
            idUsuario:idUsuario,
            idLugar:idLugar
        }
      });
    if(nuevoMarcador.length > 0){        
      res.json(true);
    } else{
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
}

export { obtenerMarcadores, crearMarcador, obtenerMarcadoresidUser, borrarMarcador, isMarcador };