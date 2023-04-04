const express = require('express');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

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
    const { nombre, apellidos, password, correo, admin } = req.body
  
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        apellidos,
        password,
        correo,
        admin
      }
    })
  
    res.json(nuevoUsuario)
  })
  

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
