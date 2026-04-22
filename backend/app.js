import express from "express";
import clientRoutes from "./src/routes/clients.js";
import cookieParser from "cookie-parser";

 
//Creo una constante que guarde Express
const app = express();
 

 
app.use(cookieParser());
 
//Que acepte los json desde postman
app.use(express.json());

app.use("/api/clients", clientRoutes);
 
export default app;
 