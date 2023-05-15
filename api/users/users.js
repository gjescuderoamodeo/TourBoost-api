import { instanciaSingleton } from "../../prisma/prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
//const prisma = instanciaSingleton;

// Función para generar un token de autenticación
function generarToken(usuario) {
  return jwt.sign({ userId: usuario.idUsuario }, 'qaRaMlBALUNSLwMsyj5z', { expiresIn: '1h' });
}

// Obtener todos los usuarios
async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los usuarios" });
  }
}

// Obtener un usuario
async function obtenerUsuario(req, res) {
  const {correo} = req.body;

  try {
    const usuario = await prisma.usuario.findFirst({
      where:{correo:correo}
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener un usuario" });
  }
}

// Comprobar si es admin
async function adminCheck(req, res) {
  const {correo} = req.body;

  try {
    const usuario = await prisma.usuario.findFirst({
      where:{correo:correo}
    });

    if(usuario.admin){
      res.status(201).json(true);
    }else{
      res.status(202).json(false);
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el usuario" });
  }
}

// Crear un nuevo usuario
async function crearUsuario(req, res) {
  const { nombre, apellidos, password, correo} = req.body;
  
  // Generar una cadena aleatoria para utilizar como salt (número de rondas de hashing)
  const salt = await bcrypt.genSalt(10);
  const admin=false

  try {
    // Hash de la contraseña
    const hashPassword = await bcrypt.hash(password, salt);

    const correoIgual = await prisma.usuario.findFirst(
      {where:{correo:correo}}
    );

    if(correoIgual){
      res.status(409).json({ error: "Ya existe ese correo" });
    }else{
      const nuevoUsuario = await prisma.usuario.create({
        data: {
          nombre,
          apellidos,
          password: hashPassword, // Guardar el hash de la contraseña en la base de datos
          correo,
          admin
        }
      });

      // Generar y devolver un token de autenticación para el nuevo usuario
      const token = generarToken(nuevoUsuario);
      res.json({ usuario: nuevoUsuario, token });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear el usuario" });
  }
}

// Login de usuario
async function login(req, res) {
  const { correo, password } = req.body;

  try {
    // Buscar el usuario por correo
    const usuario = await prisma.usuario.findFirst({ where: { correo } });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña del usuario
    const esContraseñaValida = await bcrypt.compare(password, usuario.password);

    if (!esContraseñaValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar y devolver un token de autenticación para el usuario
    const token = generarToken(usuario);
    res.json({ usuario, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
}

// Middleware para autenticación de usuario con token
function autenticar(req, res, next) {
  // Obtener el token de la cabecera de la petición
  //Quitarle el Bearer porque viene con Bearer
  const token = req.headers.authorization.replace('Bearer ','');

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, 'qaRaMlBALUNSLwMsyj5z');
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token de autenticación inválido' });
  }
}

export { obtenerUsuarios, crearUsuario, login, autenticar, adminCheck };
