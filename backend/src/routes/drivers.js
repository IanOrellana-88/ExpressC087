import express from "express";
import driversController from "../controllers/driversController.js";

const router = express.Router();

router.route("/").get(driversController.getDrivers);

router.route("/:id")
    .put(driversController.updateDriver)
    .delete(driversController.deleteDriver);

export default router;