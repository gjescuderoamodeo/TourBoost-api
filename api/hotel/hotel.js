import { instanciaSingleton } from "../../prisma/prisma.js";
//const { PrismaClient } = require('@prisma/client');

//const prisma = new PrismaClient();
const prisma = instanciaSingleton;

// Obtener todos las hoteles
async function obtenerhoteles(req, res) {
  try {
    const hoteles = await prisma.hotel.findMany();
    res.json(hoteles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los hoteles" });
  }
}

// Obtener todos las hoteles de un pais
async function obtenerhotelespais(req, res) {
  const { nombrePais } = req.params;

  try {
    const lugares = await prisma.lugar.findMany({
      where: {
        nombrePais:nombrePais
      }
    });

    if (lugares.length > 0) {
      const idLugares = lugares.map((lugar) => lugar.idLugar);

      const hoteles = await prisma.hotel.findMany({
        where: {
          idLugar: {
            in: idLugares
          }
        }
      });

      res.json(hoteles);
    } else {
      res.status(404).json({ error: "Lugar no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener los hoteles de ese país" });
  }
}

// Obtener hotel por id hotel
async function obtenerhotelesid(req, res) {
  const { idHotel } = req.params;

  try {
    const hotel = await prisma.hotel.findUnique({
      where: {
        idHotel: parseInt(idHotel)
      }
    });
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo obtener el hotel" });
  }
}

//borrar un hotel
async function borrarHotel(req, res) {
  const { nombre } = req.body;

  try {
    const hotel = await prisma.hotel.deleteMany({
      where: {
        nombre: nombre,
      },
    });
    res.json({ message: `El hotel con nombre ${nombre} ha sido eliminado correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `No se pudo eliminar el hotel con nombre ${nombre}` });
  }
}

  
// Crear un nuevo hotel
async function crearHotel(req, res) {
  const { nombre, direccion, plazasDisponibles, plazasTotales, telefono_contacto,idLugar } = req.body;

  try {
    const nuevoHotel = await prisma.hotel.create({
        data: {
          nombre,
          direccion,
          plazasDisponibles,
          plazasTotales,
          telefono_contacto,
          idLugar
        }
      });
    res.json(nuevoHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear Hotel" });
  }
}

export { obtenerhoteles, crearHotel, borrarHotel, obtenerhotelesid, obtenerhotelespais };