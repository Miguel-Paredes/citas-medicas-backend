import Especialidad from "../models/especialidades.js";
import mongoose from "mongoose";

const mostrarEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.find();
    if (!especialidades || especialidades.length === 0) return res.status(200).json({ message: "No existen registros de especialidades" });
    res.status(200).json(especialidades);
  }catch (error) {
    res.status(500).json({ error: "Error al obtener las especialidades" });
    console.log(error);
  }
};

const buscarEspecialidad = async (req, res) => {
  const especialidadID = req.params.id;
  try {
    const especialidad = await Especialidad.findById(especialidadID);
    if (!especialidad) return res.status(404).json({ message: "No existe esa especialidad" });
    res.status(200).json(especialidad);
  }catch (error) {
    res.status(500).json({ error: "Error al obtener la especialidad" });
    console.log(error);
  }
};

const registrarEspecialidad = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const exisEspecialidad = await Especialidad.findOne({ nombre });
    if (exisEspecialidad) { 
        res.json({ message: "Ya existe una especialidad con ese nombre" });
    } else {
      const nuevaEspecialidad = new Especialidad({
        _id: new mongoose.Types.ObjectId(),
        nombre,
        descripcion,
      });
      await nuevaEspecialidad.save();
      res.status(200).json({ message: "Especialidad registrada", especialidad: nuevaEspecialidad });
    }
  }catch (err) {
    res.status(500).json({ error: "Error al registrar la especialidad" });
    console.log(err);
  }
};

const actualizarEspecialidad = async (req, res) => {
  const especialidadID = req.params.id;
  try {
    const especialidadActualizada = await Especialidad.findByIdAndUpdate(
      especialidadID,
      req.body,
      { new: true }
    );
    if (!especialidadActualizada) return res.json({ error: "No se encontró la especialidad para actualizar" });
    res.status(200).json({ message: "Especialidad actualizada", especialidad: especialidadActualizada });
  }catch (error) {
    res.status(500).json({ error: "Error al actualizar la especialidad" });
    console.log(error);
  }
};

const borrarEspecialidad = async (req, res) => {
  const especialidadID = req.params.id;
  try {
    const especialidadEliminada = await Especialidad.findByIdAndDelete(especialidadID);
    if (!especialidadEliminada) return res.json({ error: "No se encontró la especialidad para eliminar" });
    res.status(200).json({ message: "Especialidad eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la especialidad" });
    console.log(error);
  }
};

export {
  mostrarEspecialidades,
  buscarEspecialidad,
  registrarEspecialidad,
  actualizarEspecialidad,
  borrarEspecialidad,
};