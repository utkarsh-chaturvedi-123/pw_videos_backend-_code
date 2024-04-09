import express from "express"
const authroute = express.Router()
import { signup ,signin} from "../controller/authcontroller.js"
authroute.post('/signup', signup)
authroute.post('/signin', signin)

export default authroute