import express from "express";
import registerClientsController from "../controllers/registerClientsController.js";

const router = express.Router();

router.route("/")
    .post(registerClientsController.register);

router.route("/verifyCodeEmail")
    .post(registerClientsController.verifyCode);

export default router;