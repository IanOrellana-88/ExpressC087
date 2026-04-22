import express from "express";
import clientsController from "../controller/clientsController.js"

const router = express.Router();

router.route("/")
.get(clientsController.getClient);

router.route("/:id")
.put(clientsController.updateClient)
.delete(clientsController.deleteClient);

export default router;

