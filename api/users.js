import { instanciaSingleton } from "../prisma/prisma.js";

const prisma = instanciaSingleton;

// Obtener todos los usuarios
async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los usuarios" });
  }
}

// Crear un nuevo usuario
async function crearUsuario(req, res) {
  const { nombre, email, contrasena } = req.body;

  try {
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        contrasena,
      },
    });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear el usuario" });
  }
}

export { obtenerUsuarios, crearUsuario };
