import express  from "express";

import {
    actualizarCita,
    borrarCita,
    buscarCita,
    mostrarCitas,
    registrarCita
} from "../controllers/citas_controllers.js";

import { verificadoAutentication } from "../controllers/login_controllers.js"

const routerCitas = express.Router()

routerCitas.use(express.json())

routerCitas.get('/listar', verificadoAutentication,  mostrarCitas);

routerCitas.get('/obtener/:id', verificadoAutentication,  buscarCita);

routerCitas.post('/register', verificadoAutentication,  registrarCita);

routerCitas.put('/actualizar/:id', verificadoAutentication,  actualizarCita);

routerCitas.delete('/eliminar/:id', verificadoAutentication,  borrarCita);

routerCitas.use((req, res) => res.status(404).end())

export default routerCitas