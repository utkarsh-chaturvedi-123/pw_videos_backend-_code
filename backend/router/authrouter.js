import express from "express"
const authroute = express.Router()
import { signup ,signin ,getUser, logout} from "../controller/authcontroller.js"
import { jwtAuth } from "../middleware/jwtAuth.js"

authroute.post('/signup', signup)
authroute.get('/signin', signin)
authroute.get('/user',jwtAuth, getUser)
authroute.get('/logout', jwtAuth ,logout)/* i will also use jwtauth if user is signin or not */

export default authroute