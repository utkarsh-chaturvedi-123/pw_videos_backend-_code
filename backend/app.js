import express from "express"


const app = express()
import authroute from "./router/authrouter.js"
import { dbmsconnect } from "./config/databaseconfig.js"

dbmsconnect();
app.use(express.json())
app.use('/api/auth' , authroute)
app.use('/', (req,res) => {
    res.status(200).json({data:'JWT server is running UP'})
})

export default app 