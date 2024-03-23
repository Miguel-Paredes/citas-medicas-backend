import bcrypt from 'bcrypt'
import mongoose from 'mongoose';

const saltRounds = 10;

const registroSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String }
});

// Encriptar la contraseña antes de guardar en el mongo
registroSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

// Verificar la contraseña al momento de hacer login
registroSchema.methods.isCorrectPassword = async function (password) {
  try {
    return await bcrypt.compare(String(password), this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Con model se crea el nombre de la coleccion del mongo
export default mongoose.model('Registro', registroSchema);