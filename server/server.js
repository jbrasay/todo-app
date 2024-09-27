
//import express
import express from "express";
//import connectToMongoDB from database.js
import {connectToDB} from "./database.js";
//import todos router
import todoRouter from "./routes/todoRoute.js"
//import cors
import cors from "cors";
//mmport ENV variables
import dotenv from "dotenv";
dotenv.config();



//Create a new server instance
const app = express();



//allows cross-origin resource sharing
app.use(cors());
//Middleware to parse json
app.use(express.json());
// use /api to prefix our endpoints
app.use("/api/todos", todoRouter);

//assign env port data to a variable
const port = process.env.PORT || 5000;
//const uri = process.env.MONGODB_URI;

//function to connect to MongoDB and Start the server
const startServer = async () => {
    await connectToDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};

//Connect to MongoDB
startServer();
