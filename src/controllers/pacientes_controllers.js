import Paciente from "../models/pacientes.js";
import mongoose from "mongoose";

const mostrarPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    if (!pacientes || pacientes.length === 0) {
      res.status(200).json({ message: "No existen registros de pacientes" });
    } else {
      res.status(200).json(pacientes);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pacientes" });
    console.log(error);
  }
};

const buscarPaciente = async (req, res) => {
  const pacienteID = req.params.id;
  try {
    const paciente = await Paciente.findById(pacienteID);
    if (!paciente) {
      res.status(404).json({ message: "No existe ese paciente" });
    } else {
      res.status(200).json(paciente);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el paciente" });
    console.log(error);
  }
};

const registrarPaciente = async (req, res) => {
  const {
    nombre,
    cedula,
    edad,
    celular,
    email,
    genero,
    direccion
  } = req.body;
  try {
    const exisPaciente = await Paciente.findOne({ cedula });
    const exisCorreo = await Paciente.findOne({ email });
    if (exisPaciente || exisCorreo) {
      if (exisPaciente && exisCorreo) return res.json({ message: "Ya existe un paciente con ese correo y cédula" });
      else if (exisCorreo) return res.json({ message: "Ya existe un paciente con ese correo" });
      else if (exisPaciente) return res.json({ message: "Ya existe un paciente con esa cédula" });
    } else {
      const nuevoPaciente = new Paciente({
        _id: new mongoose.Types.ObjectId(),
        nombre,
        cedula,
        edad,
        celular,
        email,
        genero,
        direccion
      });
      await nuevoPaciente.save();
      res.status(200).json({ message: "Paciente registrado", paciente: nuevoPaciente });
    }
  } catch (err) {
    res.status(500).json({ error: "Error al registrar el paciente" });
    console.log(err);
  }
};

const actualizarPaciente = async (req, res) => {
  const pacienteID = req.params.id;
  try {
    const pacienteActualizado = await Paciente.findByIdAndUpdate(
      pacienteID,
      req.body,
      { new: true }
    );
    if (!pacienteActualizado) return res.json({ error: "No se encontró el paciente para actualizar" });
    res.status(200).json({ message: "Paciente actualizado", paciente: pacienteActualizado });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el paciente" });
    console.log(error);
  }
};

const borrarPaciente = async (req, res) => {
  const pacienteID = req.params.id;
  try {
    const pacienteEliminado = await Paciente.findByIdAndDelete(pacienteID);
    if (!pacienteEliminado) return res.json({ error: "No se encontró el paciente para eliminar" });
    res.status(200).json({ message: "Paciente eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el paciente" });
    console.log(error);
  }
};

export {
  mostrarPacientes,
  buscarPaciente,
  registrarPaciente,
  actualizarPaciente,
  borrarPaciente,
};