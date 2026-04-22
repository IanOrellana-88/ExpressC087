import express from "express";
import loginDriversController from "../controllers/loginDriversController.js";

const router = express.Router();

router.route("/").post(loginDriversController.login);

export default router;