const express = require('express');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

//encriptador contraseña
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//obtener usuarios
app.get('/usuario', async (req, res) => {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuarios.' });
    }
  });

//crear usuarios
app.post('/usuario', async (req, res) => {
    const { nombre, apellidos, password, correo, admin } = req.body;
  
    // Generar una cadena aleatoria para utilizar como salt (número de rondas de hashing)
    const salt = await bcrypt.genSalt(10);
  
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
    })
  
    res.json(nuevoUsuario);
  })
  

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
