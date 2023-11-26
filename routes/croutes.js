import express from "express";
const api = express.Router()
import createUser from '../controllers/customerAuth.js'
import createCustomer from '../controllers/customers.js'

api.post("/create",createUser.createUser)
api.post("/createCustomer",createCustomer.createCustomer)
api.post("/login",createUser.LoginUser)
api.post("/delete",createUser.deleteU)
api.post("/updateE",createUser.updateE)
api.post("/updateP",createUser.updateP)



export default api