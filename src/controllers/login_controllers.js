import Registro from '../models/login.js';

let verificado = false;

const inicioLogin = async (req, res) => {
  registroLogin()
  const { username, password } = req.body;
  try {
    const user = await Registro.findOne({ username });
    const contra = await user.isCorrectPassword(password)
    if (!user || !contra) {
      if (!user && !contra) return res.status(500).json({ message : 'Usuario y/o contraseña incorrectos'})
      else if (!user) return res.status(500).json({ message : 'Usuario incorrecto'})
      else if (!contra) return res.status(500).json({ message : 'Contraseña incorrecto'})
    } else {
      verificado = true;
      res.status(200).send('Usuario Autenticado Correctamente');
    }
  } catch (error) {
    res.status(500).send('Error al autenticar el usuario');
    console.log(error);
  }
};

const registroLogin = async (req, res) => {
  const username = 'admin';
  const password = 'admin';

  try {
    const buscarUsername = await Registro.find({ username });
    if (buscarUsername.length === 0) {
      const user = new Registro({ username, password });
      await user.save();
    }
  } catch (error) {
    console.log('Error al crear el usuario inicial', error);
  }
};

const verificadoAutentication = (req, res, next) => {
  if(verificado){
    next();
  }else{
    res.redirect('http://localhost:3000/api/login');
  }
}

export { inicioLogin, registroLogin, verificadoAutentication };