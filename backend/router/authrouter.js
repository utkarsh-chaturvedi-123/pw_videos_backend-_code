import express from "express"
const authroute = express.Router()
import { signup } from "./authcontroller.js"

authroute.post('/signup', signup)

export default authroute