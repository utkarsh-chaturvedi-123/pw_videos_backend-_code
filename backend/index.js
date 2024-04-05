const PORT  = process.env.PORT || 5000;

import app from "./app.js";

app.listen(PORT , () => {
    console.log(`server is listining at http://localhost:${PORT}`)
})
