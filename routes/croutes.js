import express from "express";
const api = express.Router()
import createUser from '../controllers/customerAuth.js'
import createCustomer from '../controllers/customers.js'
import createNivel from '../controllers/niveles.js'
import createGrupo from '../controllers/grupos.js'
import createReto from '../controllers/retos.js'


api.post("/createCustomer",createCustomer.createCustomer)
api.post("/updateCustomer",createCustomer.updateCustomer)
api.post("/readCustomer",createCustomer.readCustomer)
api.post("/readCustomers",createCustomer.readCustomers)
api.post("/deleteCustomer",createCustomer.deleteCustomer)
api.post("/createNivel",createNivel.createNivel)
api.post("/updateNivel",createNivel.updateNivel)
api.post("/readNivel",createNivel.readNivel)
api.post("/readNivels",createNivel.readNivels)
api.post("/deleteNivel",createNivel.deleteNivel)
api.post("/create",createUser.createUser)
api.post("/login",createUser.LoginUser)
api.post("/delete",createUser.deleteU)
api.post("/updateE",createUser.updateE)
api.post("/updateP",createUser.updateP)
api.post("/createGrupo",createGrupo.createGrupo)
api.post("/readGrupo",createGrupo.readGrupo)
api.post("/deleteGrupo",createGrupo.deleteGrupo)
api.post("/registrarIntegrantes",createGrupo.registrarIntegrantes)
api.post("/createReto",createReto.createReto)
api.post("/readReto",createReto.readReto)
api.post("/registrarGrupo",createReto.registrarGrupo)
api.post("/deleteReto",createReto.deleteReto)




export default api