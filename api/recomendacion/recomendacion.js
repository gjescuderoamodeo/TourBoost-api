/*import { instanciaSingleton } from "../prisma/prisma.js";

const prisma = instanciaSingleton;

// Obtener todos las recomendaciones
async function obtenerRecomendaciones(req, res) {
  try {
    const recomendaciones = await prisma.recomendaciones.findMany();
    res.json(recomendaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los recomendaciones" });
  }
}

// Crear un nuevo Recomendaciones
async function crearRecomendaciones(req, res) {
  const { nombre, apellidos, password, correo, admin } = req.body;

  try {

    const nuevoRecomendaciones = await prisma..create({
        data: {
          ,
          apellidos,
          password: hashPassword, // Guardar el hash de la contraseña en la base de datos
          correo,
          admin
        }
      });
    res.json(nuevoRecomendaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear el Recomendaciones" });
  }
}

export { obtenerrecomendaciones, crearRecomendaciones };
*/