import express from "express";
import packagesController from "../controllers/packagesController.js";

const router = express.Router();

router.route("/")
    .get(packagesController.getPackages)   // Ver todos
    .post(packagesController.createPackage); // Crear uno nuevo

router.route("/:id")
    .get(packagesController.getPackageById) // Ver uno solo
    .put(packagesController.updatePackage)  // Actualizar
    .delete(packagesController.deletePackage); // Eliminar

export default router;