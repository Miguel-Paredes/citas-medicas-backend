import Cita from "../models/citas.js  ";
import Paciente from "../models/pacientes.js"
import Especialidad from "../models/especialidades.js";
import mongoose from "mongoose";

const mostrarCitas = async (req, res) => {
    try {
      const Citas = await Cita.find();
      if (!Citas || Citas.length === 0) {
        return res.json({ message: 'No existen registros de Citas' });
      }
      res.status(200).json(Citas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las Citas" });
      console.log(error);
    }
}

const buscarCitas = async (req, res) => {
    const CitaId = req.params.id;
    try {
      const Cita = await Cita.findById(CitaId);
      if (!Cita) {
        return res.status(404).json({ error: "No se encontró la Cita" });
      }else{
        res.status(200).json(Cita);
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la Cita" });
      console.log(error);
    }
}

const registrarCita = async (req, res) => {
    const { nombreMateria, Paciente } = req.body;
    try {
      const buscarPaciente = await Paciente.find({ nombreMateria });
      const buscarMateria = await Especialidad.find({ Paciente });
      let PacienteEncontrado = null;
      let MateriaEncontrada = null;
      for (let i = 0 ; i < buscarPaciente.length ; i++){
        if(Paciente == buscarPaciente[i].nombre){
          PacienteEncontrado = buscarPaciente[i].nombre
          break
        }
      }
      for (let i = 0 ; i < buscarMateria.length ; i++){
        if(nombreMateria == buscarMateria[i].nombremateria){
          MateriaEncontrada = buscarMateria[i].nombremateria
          break
        }
      }
      if(PacienteEncontrado == null && MateriaEncontrada == null) return res.status(404).json({ message : 'No existe la materia y tampoco el Paciente'})
      else if(PacienteEncontrado==null) return res.status(404).json({ message : 'No existe ese Paciente'})
      else if(MateriaEncontrada==null) return res.status(404).json({ message : 'No existe esa materia'})
      else {
        const exisMateria = await Cita.findOne({ nombreMateria })
        const exisPaciente = await Cita.findOne({ Paciente })
        if(exisPaciente && exisMateria) return res.status(200).json({ message : 'El Paciente ya se encuentra Citado en esa materia'})
        const nuevaCita = await Cita.create({
          _id: new mongoose.Types.ObjectId(),
          nombreMateria,
          Paciente
        });
        res.status(201).json({ message: "Cita creada", Cita : nuevaCita });
    }
    } catch (error) {
      res.status(500).json({ error: "Error al crear la Cita" });
      console.log(error);
    }
}

const actualizarCita = async (req, res) => {
  const CitaId = req.params.id;
  const { nombreMateria, Paciente } = req.body;
  try {
    const buscarPaciente = await Paciente.find({ nombreMateria });
    const buscarMateria = await Especialidad.find({ Paciente });
    let PacienteEncontrado = null;
    let MateriaEncontrada = null;
    for (let i = 0 ; i < buscarPaciente.length ; i++){
      if(Paciente == buscarPaciente[i].nombre){
        PacienteEncontrado = buscarPaciente[i].nombre
        break
      }
    }
    for (let i = 0 ; i < buscarMateria.length ; i++){
      if(nombreMateria == buscarMateria[i].nombremateria){
        MateriaEncontrada = buscarMateria[i].nombremateria
        break
      }
    }
    if (MateriaEncontrada == null && PacienteEncontrado == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe ese Paciente y tampoco la materia' });
    } else if (PacienteEncontrado == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe ese Paciente' });
    } else if (MateriaEncontrada == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe esa materia' });
    } else {
      const CitaActualizada = await Cita.findByIdAndUpdate(CitaId, req.body, { new: true });
      if (!CitaActualizada) return res.status(404).json({ error: "No se encontró la matrícula para actualizar" });
      res.status(200).json({ message: "Matrícula actualizada", Cita: CitaActualizada });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la matrícula" });
    console.log(error);
  }
};

const borrarCita = async (req, res) => {
    const CitaId = req.params.id;
    try {
      const CitaEliminada = await Cita.findByIdAndDelete(CitaId);
      if (!CitaEliminada) {
        return res
          .status(404)
          .json({ error: "No se encontró la Cita para eliminar" });
      }
      res.status(200).json({ message: "Cita eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la Cita" });
      console.log(error);
    }
}

export {
    mostrarCitas,
    buscarCitas,
    registrarCita,
    actualizarCita,
    borrarCita
}