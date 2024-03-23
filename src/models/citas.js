import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre : {
    type : mongoose.Schema.Types.String,
    ref : 'Paciente',
    require : true
  },
  cedula: { 
    type: mongoose.Schema.Types.Number, 
    ref: 'Paciente', 
    require: true 
  },
  especialidad: { 
    type: mongoose.Schema.Types.String, 
    ref: 'Especialidad', 
    require: true 
  },
  fecha: { type: Date, require: true },
  descripcion: { type: String }
});

export default mongoose.model('Cita', citaSchema);