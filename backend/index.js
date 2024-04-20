import  Dotenv  from "dotenv";
import app from "./app.js";
/* importing app.js because i have import express in the app.js so , we are creating a server using express ,bcz expre is inside 'const app = express()'  */
Dotenv.config({
    path: './env'
});

const PORT  = process.env.PORT ;

app.listen(PORT , () => {
    console.log(`server is listining at http://localhost:${PORT}`)
})
