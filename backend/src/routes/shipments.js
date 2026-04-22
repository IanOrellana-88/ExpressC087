import express from "express";
import shipmentsController from "../controllers/shipmentsController.js";

const router = express.Router();

router.route("/")
    .get(shipmentsController.getShipments)
    .post(shipmentsController.createShipment);

router.route("/:id")
    .get(shipmentsController.getShipmentById)
    .put(shipmentsController.updateShipment)
    .delete(shipmentsController.deleteShipment);

export default router;