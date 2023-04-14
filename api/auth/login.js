const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controlador de autenticación
async function login(req, res) {
    const { correo, password } = req.body;
    const usuario = await prisma.usuario.findFirst({ where: { correo } });
  
    if (!usuario) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
  
    const passwordValido = await bcrypt.compare(password, usuario.password);
  
    if (!passwordValido) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
  
    const token = jwt.sign({ id: usuario.idUsuario }, 'secreto', { expiresIn: '1d' });
  
    res.status(200).json({ token });
  }
  
  // Middleware de autenticación
  function autenticar(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secreto');
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token no válido' });
    }
  }
  