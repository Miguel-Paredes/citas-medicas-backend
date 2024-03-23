import express  from "express";
import { 
  mostrarPacientes,
  buscarPaciente,
  registrarPaciente,
  actualizarPaciente,
  borrarPaciente,
} from "../controllers/pacientes_controllers.js";

import { verificadoAutentication } from "../controllers/login_controllers.js"

const routerPacientes = express.Router()

routerPacientes.use(express.json())

routerPacientes.get('/listar', verificadoAutentication,  mostrarPacientes);

routerPacientes.get('/obtener/:id', verificadoAutentication,  buscarPaciente);

routerPacientes.post('/register', verificadoAutentication,  registrarPaciente);

routerPacientes.put('/actualizar/:id', verificadoAutentication,  actualizarPaciente);

routerPacientes.delete('/eliminar/:id', verificadoAutentication,  borrarPaciente);

routerPacientes.use((req, res) => res.status(404).end())

export default routerPacientes