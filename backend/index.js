import  Dotenv  from "dotenv";

Dotenv.config({
    path: './env'
});

const PORT  = process.env.PORT ;

import app from "./app.js";

app.listen(PORT , () => {
    console.log(`server is listining at http://localhost:${PORT}`)
})
