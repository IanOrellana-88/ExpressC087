import express from "express";
import routesController from "../controllers/routesController.js";

const router = express.Router();

router.route("/")
    .get(routesController.getRoutes)
    .post(routesController.createRoute);

router.route("/:id")
    .get(routesController.getRouteById)
    .put(routesController.updateRoute)
    .delete(routesController.deleteRoute);

export default router;