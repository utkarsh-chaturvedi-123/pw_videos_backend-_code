import express from "express"
import cors from 'cors'

const app = express()
import authroute from "./router/authrouter.js"
import { dbmsconnect } from "./config/databaseconfig.js"
import cookieParser  from "cookie-parser"

dbmsconnect();
app.use(express.json())
app.use(cookieParser())/* This will ensure that you cookies is  parse bcz jo bhi request phuche wo parse hoke phuche jisse ki jwtauth.js me usko .token karke access kr sake*/
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true

}))
app.use('/api/auth' , authroute)
app.use('/', (req,res) => {
    res.status(200).json({data:'JWT server is running UP'})
})

export default app 