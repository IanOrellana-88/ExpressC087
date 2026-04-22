import express from "express";
import loginClientsController from "../controllers/loginClientsController.js";

const router = express.Router();

router.route("/")
    .post(loginClientsController.login);

export default router;