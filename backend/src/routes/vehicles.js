import express from "express";
import vehiclesController from "../controllers/vehiclesController.js";

const router = express.Router();

router.route("/")
    .get(vehiclesController.getVehicles)
    .post(vehiclesController.createVehicle);

router.route("/:id")
    .get(vehiclesController.getVehicleById)
    .put(vehiclesController.updateVehicle)
    .delete(vehiclesController.deleteVehicle);

export default router;