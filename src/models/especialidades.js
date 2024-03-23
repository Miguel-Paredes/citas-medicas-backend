import mongoose from "mongoose";

const especialidadSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: { type: String, require: true, unique: true, trim : true },
  descripcion: { type: String, trim : true  }
});

export default mongoose.model('Especialidad', especialidadSchema);