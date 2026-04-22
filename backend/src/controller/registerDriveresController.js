import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import driverModel from "../models/drivers.js";
import { config } from "../../config.js";

const registerDriversController = {};

registerDriversController.register = async (req, res) => {
    const { name, lastName, licenseNumber, phone, email, password } = req.body;

    try {
        const existsDriver = await driverModel.findOne({ email });
        if (existsDriver) {
            return res.status(400).json({ message: "El conductor ya existe" });
        }

        const passwordHashed = await bcryptjs.hash(password, 10);
        const randomNumber = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            { randomNumber, name, lastName, licenseNumber, phone, email, password: passwordHashed },
            config.JWT.secret,
            { expiresIn: "15m" }
        );

        res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000, httpOnly: true });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password,
            },
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de Conductor",
            text: `Tu código de verificación es: ${randomNumber}. Expira en 15 min.`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) return res.status(500).json({ message: "Error al enviar correo" });
            return res.status(200).json({ message: "Correo enviado" });
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

registerDriversController.verifyCode = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body;
        const token = req.cookies.registrationCookie;

        if (!token) return res.status(400).json({ message: "Sesión expirada" });

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { randomNumber: storedCode, name, lastName, licenseNumber, phone, email, password } = decoded;

        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: "Código incorrecto" });
        }

        const newDriver = new driverModel({
            name, lastName, licenseNumber, phone, email, password,
            isVerified: true,
            isActive: true
        });

        await newDriver.save();
        res.clearCookie("registrationCookie");
        return res.status(201).json({ message: "Conductor registrado con éxito" });

    } catch (error) {
        return res.status(500).json({ message: "Error en la verificación" });
    }
};

export default registerDriversController;