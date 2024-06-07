import { collection, ObjectId } from "../models/aspirantes.js";
import bcrypt from "bcryptjs";

async function createAspirante(req, res) {
  const {
    nombre,
    identificacion,
    isBossdepartamento,
    departamento,
    edad,
    sexo,
    file,
    email,
    telefono,
  } = req.body;

  try {
    const newAspirante = {
      nombre,
      identificacion,
      departamento,
      edad,
      sexo,
      rol: "aspirante", // Rol por defecto es "aspirante"
      file,
      email,
      telefono,
      estado: "en proceso", // Estado por defecto es "en proceso"
      date_create: new Date(),
    };

    await collection.insertOne(newAspirante);
    res.status(201).json({ message: "Aspirante creado exitosamente" });
  } catch (error) {
    console.error(`Error registrando aspirante: ${error}`);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}


// Leer todos
const getAllAspirantes = async (req, res) => {
  try {
    const aspirantes = await collection.find().toArray();
    res.json(aspirantes);
  } catch (error) {
    console.error(`Error obteniendo aspirantes: ${error}`);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Leer uno
async function getAspirante(req, res) {
  try {
    const id = req.params.id;
    const aspirante = await collection.findOne({ _id: new ObjectId(id) });
    if (aspirante) {
      res.status(200).json(aspirante);
    } else {
      res.status(404).json({ message: "Aspirante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

// Actualizar
async function updateAspirante(req, res) {
  try {
    const id = req.params.id;
    const updates = {
      nombre: req.body.nombre,
      identificacion: req.body.identificacion,
      departamento: req.body.departamento,
      edad: req.body.edad,
      sexo: req.body.sexo,
      rol: req.body.rol,
      file: req.body.file,
      email: req.body.email,
      telefono: req.body.telefono,
      estado: req.body.estado,
      date_create: req.body.date_create ? new Date(req.body.date_create) : undefined,
    };

    // Eliminar cualquier campo undefined
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Aspirante no encontrado" });
    } else {
      res.status(200).json({ message: "Aspirante actualizado exitosamente" });
    }
  } catch (error) {
    console.error(`Error actualizando aspirante: ${error}`);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

// Eliminar
async function deleteAspirante(req, res) {
  try {
    const id = req.params.id;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Aspirante no encontrado" });
    } else {
      res.status(200).json({ message: "Aspirante eliminado exitosamente" });
    }
  } catch (error) {
    console.error(`Error eliminando aspirante: ${error}`);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

// Función auxiliar para obtener aspirante por ID
async function getAspiranteById(aspiranteId) {
  const aspirante = await collection.findOne({ _id: new ObjectId(aspiranteId) });
  return aspirante;
}

// Función auxiliar para actualizar aspirante
async function updateAspiranteOne(aspiranteId, updatedAspiranteData) {
  await collection.updateOne(
    { _id: new ObjectId(aspiranteId) },
    { $set: updatedAspiranteData }
  );
}

export {
  createAspirante,
  getAspirante,
  updateAspirante,
  deleteAspirante,
  getAllAspirantes,
  getAspiranteById,
  updateAspiranteOne,
};
