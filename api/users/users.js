import { instanciaSingleton } from "../../prisma/prisma.js";
import bcrypt from 'bcrypt';

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
  const { nombre, apellidos, password, correo, admin } = req.body;
  
  // Generar una cadena aleatoria para utilizar como salt (número de rondas de hashing)
  const salt = await bcrypt.genSalt(10);

  try {
  // Hash de la contraseña
  const hashPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = await prisma.usuario.create({
        data: {
          nombre,
          apellidos,
          password: hashPassword, // Guardar el hash de la contraseña en la base de datos
          correo,
          admin
        }
      });
    res.json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear el usuario" });
  }
}

export { obtenerUsuarios, crearUsuario };
