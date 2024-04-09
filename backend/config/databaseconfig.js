import Mongoose from "mongoose";

const mongoDB_URL = process.env.MONGODB_URL;

const dbmsconnect = () => {
  Mongoose.connect(mongoDB_URL)
    .then((conn) => console.log(`Connected to DB: ${conn.connection.host}`))
    .catch((error) => console.log(`Error connecting to DB: ${error.message}`));
};

export { dbmsconnect };
