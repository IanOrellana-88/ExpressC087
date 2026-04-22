import express from "express";
import registerDriversController from "../controllers/registerDriversController.js";

const router = express.Router();

router.route("/").post(registerDriversController.register);
router.route("/verifyCodeEmail").post(registerDriversController.verifyCode);

export default router;