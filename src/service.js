import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerLogin from './routers/router_login.js'
import routerPacientes from './routers/router_pacientes.js'
import routerEspecialidades from './routers/router_especialidades.js'
import routerCitas from './routers/router_citas.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

app.set('port', process.env.port || 3000)

app.get('/', (req, res) => res.send('Bienvenido'))

app.use('/api/login', routerLogin)
app.use('/api/pacientes', routerPacientes)
app.use('/api/especialidades', routerEspecialidades)
app.use('/api/citas', routerCitas)

app.use((req, res) => res.status(404).end())

export default app