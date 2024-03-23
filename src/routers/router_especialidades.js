import express  from "express";
import {
  actualizarEspecialidad,
  borrarEspecialidad,
  buscarEspecialidad,
  mostrarEspecialidades,
  registrarEspecialidad
} from "../controllers/especialidades_controllers.js";

import { verificadoAutentication } from "../controllers/login_controllers.js"

const routerEspecialidades = express.Router()

routerEspecialidades.use(express.json())

routerEspecialidades.get('/listar', verificadoAutentication,  mostrarEspecialidades);

routerEspecialidades.get('/obtener/:id', verificadoAutentication,  buscarEspecialidad);

routerEspecialidades.post('/register', verificadoAutentication,  registrarEspecialidad);

routerEspecialidades.put('/actualizar/:id', verificadoAutentication,  actualizarEspecialidad);

routerEspecialidades.delete('/eliminar/:id', verificadoAutentication,  borrarEspecialidad);

routerEspecialidades.use((req, res) => res.status(404).end())

export default routerEspecialidades