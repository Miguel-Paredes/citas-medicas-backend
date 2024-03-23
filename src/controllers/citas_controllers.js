import Cita from "../models/citas.js";
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

const buscarCita = async (req, res) => {
    const CitaId = req.params.id;
    try {
      const Citas = await Cita.findById(CitaId);
      if (!Citas) {
        return res.status(404).json({ error: "No se encontró la Cita" });
      }else{
        return res.status(200).json(Citas);
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la Cita" });
      console.log(error);
    }
}

const registrarCita = async (req, res) => {
    const { cedula, especialidad, fecha, descripcion } = req.body;
    let { nombre } = req.body
    try {
      const buscarCedula = await Paciente.find({ cedula });
      const buscarEspecialidad = await Especialidad.find({ especialidad });
      let CedulaEncontrado = null;
      let EspecialidadEncontrada = null;
      for (let i = 0 ; i < buscarCedula.length ; i++){
        if(cedula == buscarCedula[i].cedula){
          CedulaEncontrado = buscarCedula[i].cedula
          nombre = buscarCedula[i].nombre
          break
        }
      }
      for (let i = 0 ; i < buscarEspecialidad.length ; i++){
        if(especialidad == buscarEspecialidad[i].nombre){
          EspecialidadEncontrada = buscarEspecialidad[i].nombre
          break
        }
      }
      if(CedulaEncontrado == null && EspecialidadEncontrada == null) return res.status(404).json({ message : 'No existe ese paciente y tampoco la especialidad'})
      else if(CedulaEncontrado == null) return res.status(404).json({ message : 'No existe ese Paciente'})
      else if(EspecialidadEncontrada==null) return res.status(404).json({ message : 'No existe esa especialidad'})
      else {
        const exisFecha = await Cita.findOne({ fecha })
        const exisPaciente = await Cita.findOne({ cedula })
        if(exisPaciente && exisFecha) return res.status(200).json({ message : 'El Paciente ya tiene una cita esa fecha'})
        const nuevaCita = await Cita.create({
          _id: new mongoose.Types.ObjectId(),
          nombre,
          cedula,
          especialidad,
          fecha,
          descripcion
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
  const { cedula, especialidad, fecha, descripcion } = req.body;
  let { nombre } = req.body
  try {
    const buscarCedula = await Paciente.find({ cedula });
      const buscarEspecialidad = await Especialidad.find({ especialidad });
      let CedulaEncontrado = null;
      let EspecialidadEncontrada = null;
      for (let i = 0 ; i < buscarCedula.length ; i++){
        if(cedula == buscarCedula[i].cedula){
          CedulaEncontrado = buscarCedula[i].cedula
          nombre = buscarCedula[i].nombre
          break
        }
      }
      for (let i = 0 ; i < buscarEspecialidad.length ; i++){
        if(especialidad == buscarEspecialidad[i].nombre){
          EspecialidadEncontrada = buscarEspecialidad[i].nombre
          break
        }
      }
      if(CedulaEncontrado == null && EspecialidadEncontrada == null) return res.status(404).json({ message : 'No existe ese paciente y tampoco la especialidad'})
      else if(CedulaEncontrado == null) return res.status(404).json({ message : 'No existe ese Paciente'})
      else if(EspecialidadEncontrada==null) return res.status(404).json({ message : 'No existe esa especialidad'})
      else {
      const CitaActualizada = await Cita.findByIdAndUpdate(
        CitaId, 
        {
          nombre,
          cedula,
          especialidad,
          fecha,
          descripcion
        },
        {
           new: true 
        });
      if (!CitaActualizada) return res.status(404).json({ error: "No se encontró la cita para actualizar" });
      res.status(200).json({ message: "Cita actualizada", Cita: CitaActualizada });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la cita" });
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
    buscarCita,
    registrarCita,
    actualizarCita,
    borrarCita
}