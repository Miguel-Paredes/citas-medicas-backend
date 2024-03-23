import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: { type: String, require: true, trim : true  },
  cedula: { type: Number, require: true, unique: true, trim : true  },
  edad: { type: Number, require: true, trim : true  },
  celular: { type: Number, require: true, trim : true  },
  email: { type: String, require: true, unique: true, trim : true  },
  genero: { type: String, enum: ['masculino', 'femenino'], require: true, trim : true  },
  direccion: { type : String, require : true, trim : true  },
  fechaIngreso: { type: Date, default: Date.now }
});

export default mongoose.model('Paciente', pacienteSchema);